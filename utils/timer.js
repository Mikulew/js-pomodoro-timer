import { TABS, DEFAULT_TIMER_VALUES } from '../consts/index.js';

const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

export const changeTimer = (tab) => {
  console.log(DEFAULT_TIMER_VALUES[tab]);
  minutes.innerText = formatValue(DEFAULT_TIMER_VALUES[tab].min);
  seconds.innerText = formatValue(DEFAULT_TIMER_VALUES[tab].sec);
};

export const initTimer = () => changeTimer(TABS.POMODORO);

export const formatValue = (number) => number < 10 ? `0${number}` : number;
