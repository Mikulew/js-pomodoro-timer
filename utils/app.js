import { initTabs } from "./tabs.js";
import { initTimer } from "./timer.js";
import { initSettings } from "./settings.js";

export const initApp = () => {
  initTabs();
  initTimer();
  initSettings();
};
