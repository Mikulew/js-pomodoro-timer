import { TABS } from '../consts/index.js';
import { changeTimer } from './timer.js';

const tabs = document.querySelectorAll('.tab');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => handleTabClick(tabs, index));
});

export const initTabs = () => activateTab(tabs, TABS.POMODORO);

export const handleTabClick = (elements, index) => {
  const element = elements[index];

  switch(element.dataset.tab) {
    case TABS.POMODORO:
      activateTab(elements, TABS.POMODORO);
      changeTimer(TABS.POMODORO);
      break;
    case TABS.SHORT_BREAK:
      activateTab(elements, TABS.SHORT_BREAK);
      changeTimer(TABS.SHORT_BREAK);
      break;
    case TABS.LONG_BREAK:
      activateTab(elements, TABS.LONG_BREAK);
      changeTimer(TABS.LONG_BREAK);
      break;
    default:
      console.warn('Unsupported tab.');
  }
};

function activateTab(elements, tab) {
  elements.forEach(element => {
    if (element.dataset.tab === tab) {
      element.classList.add('selected');
    } else {
      element.classList.remove('selected')
    }
  });
}
