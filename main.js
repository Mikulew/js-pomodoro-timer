import { handleTabClick } from './utils/tabs.js';

const startBtn = document.getElementById("start");
const tabs = document.querySelectorAll('.tab');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => handleTabClick(tabs, index));
});

startBtn.addEventListener('click', () => console.log('clicked!'));
