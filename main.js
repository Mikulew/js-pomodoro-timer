import { initTimer } from './utils/timer.js';
import { handleTabClick } from './utils/tabs.js';

const tabs = document.querySelectorAll('.tab');

initTimer();

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => handleTabClick(tabs, index));
});
