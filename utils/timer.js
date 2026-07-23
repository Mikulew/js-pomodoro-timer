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
let timer = null;
let initialMinutes = null;
let initialSeconds = null;

const state = {
  activeTab: TABS.POMODORO,
  timer: {
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
  DOM.minutes.textContent = formatValue(state.timer.current.minutes);
  DOM.seconds.textContent = formatValue(state.timer.current.seconds);
};

export const loadTimerState = () => {
  const tab = state.activeTab;
  const hasLocaleStorage = checkIsLocaleStored(tab);
  const timer = hasLocaleStorage
    ? {
        minutes: Number(localStorage.getItem(LOCAL_STORAGE_VALUES[tab].minutes)),
        seconds: Number(localStorage.getItem(LOCAL_STORAGE_VALUES[tab].seconds)),
      }
    : DEFAULT_TIMER_VALUES[tab];
  state.timer.current = { ...timer };
  state.timer.initial = { ...timer };
};

export const changeTimer = (tab) => {
  state.activeTab = tab;
  loadTimerState();
  renderTimer();
  restartTimer();
};

export const initTimer = () => {
  changeTimer(state.activeTab);
  DOM.startButton.addEventListener("click", () => (timer === null) ? startTimer() : null);
};

export const refreshCurrentTimer = () => {
  changeTimer(state.activeTab);
};

const startTimer = () => timer = setInterval(countDown, 1000);

const restartTimer = () => {
  DOM.startButton.disabled = false;
  clearInterval(timer);
  timer = null;
};

const countDown = () => {
  let current = state.timer.current;
  DOM.startButton.disabled = true;
  if (current.minutes === 0 && current.seconds === 0) {
    renderTimer();
    playAudio();
    clearInterval(timer);
    return setTimeout(() => {
      DOM.startButton.disabled = false;
      changeTimer(state.activeTab);
      DOM.minutes.innerText = formatValue(state.timer.initial.minutes);
      DOM.seconds.innerText = formatValue(state.timer.initial.seconds);
      timer = null;
    }, SOUNDTRACK_PLAYING_TIME);
  }
  if (current.seconds === 0) {
    current.seconds = 59;
    current.minutes--; 
  } else {
    current.seconds--;
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
