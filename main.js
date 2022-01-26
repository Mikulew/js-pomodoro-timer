import { initTimer } from './utils/timer.js';
import { handleTabClick } from './utils/tabs.js';
import initSettings from './utils/settings.js';

const tabs = document.querySelectorAll('.tab');
const settingsButton = document.getElementById('settingsButton');

initTimer();

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => handleTabClick(tabs, index));
});

settingsButton.addEventListener('click', () => initSettings());
