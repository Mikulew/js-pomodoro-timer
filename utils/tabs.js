import { TABS } from '../consts/index.js';

export const handleTabClick = (elements, index) => {
  const element = elements[index];

  switch(element.dataset.tab) {
    case TABS.POMODORO:
      console.log('POMODORO');
      activateTab(elements, TABS.POMODORO);
      break;
    case TABS.SHORT_BREAK:
      console.log('SHORT BREAK');
      activateTab(elements, TABS.SHORT_BREAK);
      break;
    case TABS.LONG_BREAK:
      console.log('LONG BREAK');
      activateTab(elements, TABS.LONG_BREAK);
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
