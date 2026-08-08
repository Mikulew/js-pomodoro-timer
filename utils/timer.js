import {
  TABS,
  DEFAULT_TIMER_VALUES,
  LOCAL_STORAGE_VALUES,
  DEFAULT_SOUNDTRACK_PATH,
  SOUNDTRACK_PLAYING_TIME,
  HTML_ELEMENTS
} from "../consts/index.js";
import { checkIsLocaleStored } from "./validation.js";
import { getHTMLElement } from "./dom.js";

const DOM = {
  startButton: getHTMLElement(HTML_ELEMENTS.START_BUTTON),
  minutes: getHTMLElement(HTML_ELEMENTS.MINUTES_BLOCK),
  seconds: getHTMLElement(HTML_ELEMENTS.SECONDS_BLOCK),
};

const audio = Object.entries(DEFAULT_SOUNDTRACK_PATH).reduce((result, [tab, path]) => {
  result[tab] = new Audio(path);
  return result;
}, {});

const state = {
  timer: null,
  activeTab: TABS.POMODORO,
  time: {
    current: {
      minutes: null,
      seconds: null,
    },
    initial: {
      minutes: null,
      seconds: null,
    },
  },
};

const formatValue = (number) => number < 10 ? `0${number}` : number;

const renderTimer = () => {
  DOM.minutes.textContent = formatValue(state.time.current.minutes);
  DOM.seconds.textContent = formatValue(state.time.current.seconds);
};

export const loadTimerState = () => {
  const tab = state.activeTab;
  const hasLocaleStorage = checkIsLocaleStored(tab);
  const time = hasLocaleStorage
    ? {
        minutes: Number(localStorage.getItem(LOCAL_STORAGE_VALUES[tab].minutes)),
        seconds: Number(localStorage.getItem(LOCAL_STORAGE_VALUES[tab].seconds)),
      }
    : DEFAULT_TIMER_VALUES[tab];

  state.time.current = { ...time };
  state.time.initial = { ...time };
};

export const changeTimer = (tab) => {
  state.activeTab = tab;
  loadTimerState();
  renderTimer();
  restartTimer();
};

export const initTimer = () => {
  changeTimer(state.activeTab);
  DOM.startButton.addEventListener("click", () => (state.timer === null) ? startTimer() : null);
};

export const refreshCurrentTimer = () => {
  changeTimer(state.activeTab);
};

const startTimer = () => state.timer = setInterval(countDown, 1000);

const restartTimer = () => {
  DOM.startButton.disabled = false;
  clearInterval(state.timer);
  state.timer = null;
};

const countDown = () => {
  let currentTime = state.time.current;
  DOM.startButton.disabled = true;
  if (currentTime.minutes === 0 && currentTime.seconds === 0) {
    renderTimer();
    playAudio();
    clearInterval(state.timer);
    return setTimeout(() => {
      DOM.startButton.disabled = false;
      changeTimer(state.activeTab);
      DOM.minutes.innerText = formatValue(state.time.initial.minutes);
      DOM.seconds.innerText = formatValue(state.time.initial.seconds);
      state.timer = null;
    }, SOUNDTRACK_PLAYING_TIME);
  }
  if (currentTime.seconds === 0) {
    currentTime.seconds = 59;
    currentTime.minutes--; 
  } else {
    currentTime.seconds--;
  }
  renderTimer();
}

export const getTimers = inputs => inputs.reduce((accumulator, input) => {
  const { name, typeDigit } = input.dataset;
  const value = input.value === "" ? 0 : Number.parseInt(input.value);
  if (accumulator[name] === undefined) accumulator[name] = {};
  if (accumulator[name][typeDigit] === undefined) accumulator[name][typeDigit] = value;
  return accumulator;
}, {});

const playAudio = () => {
    audio[state.activeTab].currentTime = 0;
    audio[state.activeTab].play();
};
