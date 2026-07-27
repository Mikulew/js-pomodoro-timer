import { TABS, HTML_ELEMENTS } from "../consts/index.js";
import { changeTimer } from "./timer.js";
import { getHTMLElement } from "./dom.js";

const tabs = getHTMLElement(HTML_ELEMENTS.TABS);

export const initTabs = () => {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => handleTabClick(tabs, index));
  });
  activateTab(tabs, TABS.POMODORO);
};

export const handleTabClick = (elements, index) => {
  const element = elements[index];

  switch (element.dataset.tab) {
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
      console.warn("Unsupported tab.");
  }
};

const activateTab = (elements, tab) => {
  elements.forEach(element => {
    if (element.dataset.tab === tab) {
      element.classList.add("selected");
    } else {
      element.classList.remove("selected")
    }
  });
}
