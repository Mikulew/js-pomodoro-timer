import { initTimer } from './utils/timer.js';
import { handleTabClick } from './utils/tabs.js';

const startBtn = document.getElementById("start");
const tabs = document.querySelectorAll('.tab');

initTimer();

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => handleTabClick(tabs, index));
});

startBtn.addEventListener('click', () => console.log('clicked!'));
