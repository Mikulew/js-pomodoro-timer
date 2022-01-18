import { TABS, DEFAULT_TIMER_VALUES } from '../consts/index.js';

const startBtn = document.getElementById("start");
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

export const changeTimer = (tab) => {
  minutes.innerText = formatValue(DEFAULT_TIMER_VALUES[tab].min);
  seconds.innerText = formatValue(DEFAULT_TIMER_VALUES[tab].sec);
};

export const initTimer = () => {
  changeTimer(TABS.POMODORO);
  startBtn.addEventListener('click', () => countDown());
}

export const formatValue = (number) => number < 10 ? `0${number}` : number;

export const countDown = () => {
  const timer = setInterval(() => {
    let tempMinutes = Number.parseInt(minutes.innerText);
    let tempSeconds = Number.parseInt(seconds.innerText);
    startBtn.disabled = true;
    if (tempMinutes === 0 && tempSeconds === 0) {
      startBtn.disabled = false;
      minutes.innerText = formatValue(tempMinutes);
      seconds.innerText = formatValue(tempSeconds);
      return clearInterval(timer);
    }
    if (tempSeconds === 0) {
      tempSeconds = 59;
      tempMinutes--;
    } else {
      tempSeconds--;
    }
    minutes.innerText = formatValue(tempMinutes);
    seconds.innerText = formatValue(tempSeconds);
  }, 1000);
};
