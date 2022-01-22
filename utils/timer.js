import { TABS, DEFAULT_TIMER_VALUES, DEFAULT_SOUNDTRACK_PATH } from '../consts/index.js';

const startBtn = document.getElementById("start");
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
let timer = null;
let audioElement = null;
let initialMinutes = null;
let initialSeconds = null;

const formatValue = (number) => number < 10 ? `0${number}` : number;

export const changeTimer = (tab) => {
  minutes.innerText = formatValue(DEFAULT_TIMER_VALUES[tab].min);
  seconds.innerText = formatValue(DEFAULT_TIMER_VALUES[tab].sec);
  initialMinutes = DEFAULT_TIMER_VALUES[tab].min;
  initialSeconds = DEFAULT_TIMER_VALUES[tab].sec;
  audioElement = new Audio(DEFAULT_SOUNDTRACK_PATH[tab]);
  restartTimer();
};

export const initTimer = () => {
  changeTimer(TABS.POMODORO);
  startBtn.addEventListener('click', () => (timer === null) ? startTimer() : null);
}

const startTimer = () => timer = setInterval(countDown, 1000);

const restartTimer = () => {
  startBtn.disabled = false;
  return clearInterval(timer);
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
    }, 2500);
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
