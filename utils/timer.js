import {
  TABS,
  DEFAULT_TIMER_VALUES,
  LOCAL_STORAGE_VALUES,
  DEFAULT_SOUNDTRACK_PATH,
  SOUNDTRACK_PLAYING_TIME,
} from '../consts/index.js';
import { checkIsLocaleStored } from '../utils/validation.js';

const startBtn = document.getElementById("start");
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
let timer = null;
let audioElement = null;
let initialMinutes = null;
let initialSeconds = null;

const formatValue = (number) => number < 10 ? `0${number}` : number;

export const changeTimer = (tab) => {
  const hasLocaleStorage = checkIsLocaleStored(tab);
  minutes.innerText = hasLocaleStorage ? formatValue(localStorage.getItem(LOCAL_STORAGE_VALUES[tab].minutes)) : formatValue(DEFAULT_TIMER_VALUES[tab].minutes);
  seconds.innerText = hasLocaleStorage ? formatValue(localStorage.getItem(LOCAL_STORAGE_VALUES[tab].seconds)) : formatValue(DEFAULT_TIMER_VALUES[tab].seconds);
  initialMinutes = hasLocaleStorage ? localStorage.getItem(LOCAL_STORAGE_VALUES[tab].minutes) : DEFAULT_TIMER_VALUES[tab].minutes;
  initialSeconds = hasLocaleStorage ? localStorage.getItem(LOCAL_STORAGE_VALUES[tab].seconds) : DEFAULT_TIMER_VALUES[tab].seconds;
  audioElement = new Audio(DEFAULT_SOUNDTRACK_PATH[tab]);
  restartTimer();
};

export const initTimer = () => {
  changeTimer(TABS.POMODORO);
  startBtn.addEventListener('click', () => (timer === null) ? startTimer() : null);
};

const startTimer = () => timer = setInterval(countDown, 1000);

const restartTimer = () => {
  startBtn.disabled = false;
  clearInterval(timer);
  timer = null;
};

function countDown() {
  let tempMinutes = Number.parseInt(minutes.innerText);
  let tempSeconds = Number.parseInt(seconds.innerText);
  startBtn.disabled = true;
  if (tempMinutes === 0 && tempSeconds === 0) {
    minutes.innerText = formatValue(tempMinutes);
    seconds.innerText = formatValue(tempSeconds);
    audioElement.play();
    clearInterval(timer);
    return setTimeout(() => {
      startBtn.disabled = false;
      minutes.innerText = formatValue(initialMinutes);
      seconds.innerText = formatValue(initialSeconds);
      timer = null;
    }, SOUNDTRACK_PLAYING_TIME);
  }
  if (tempSeconds === 0) {
    tempSeconds = 59;
    tempMinutes--;
  } else {
    tempSeconds--;
  }
  minutes.innerText = formatValue(tempMinutes);
  seconds.innerText = formatValue(tempSeconds);
}

export const getTimers = inputs => inputs.reduce((accumulator, input) => {
  const { name, typeDigit } = input.dataset;
  const value = input.value === '' ? 0 : Number.parseInt(input.value);
  if (accumulator[name] === undefined) accumulator[name] = {};
  if (accumulator[name][typeDigit] === undefined) accumulator[name][typeDigit] = value;
  return accumulator;
}, {});
