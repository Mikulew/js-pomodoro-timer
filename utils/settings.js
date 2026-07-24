import {
  DEFAULT_TIMER_VALUES,
  LOCAL_STORAGE_VALUES,
  LEADING_ZEROS,
  HTML_ELEMENTS,
} from "../consts/index.js";
import { initTimer, refreshCurrentTimer } from "./timer.js";
import { initTabs } from "./tabs.js";
import {
  validateAllowedCharacters,
  validateInputs,
  displayErrors,
  checkIsLocaleStored,
} from "./validation.js";
import { getHTMLElement } from "./dom.js";

const DOM = {
  settings: getHTMLElement(HTML_ELEMENTS.SETTINGS),
  settingsButton: getHTMLElement(HTML_ELEMENTS.SETTINGS_BUTTON),
  closeButton: getHTMLElement(HTML_ELEMENTS.CLOSE_BUTTON),
  saveButton: getHTMLElement(HTML_ELEMENTS.SAVE_BUTTON),
  resetSettingsButton: getHTMLElement(HTML_ELEMENTS.RESET_SETTOMGS_BUTTON),
  pomodoroMinutes: getHTMLElement(HTML_ELEMENTS.POMODORO_MINUTES_INPUT),
  pomodoroSeconds: getHTMLElement(HTML_ELEMENTS.POMODORO_SECONDS_INPUT),
  shortBreakMinutes: getHTMLElement(HTML_ELEMENTS.SHORT_BREAK_MINUTES_INPUT),
  shortBreakSeconds: getHTMLElement(HTML_ELEMENTS.SHORT_BREAK_SECONDS_INPUT),
  longBreakMinutes: getHTMLElement(HTML_ELEMENTS.LONG_BREAK_MINUTES_INPUT),
  longBreakSeconds: getHTMLElement(HTML_ELEMENTS.LONG_BREAK_SECONDS_INPUT),
};
const inputs = [DOM.pomodoroMinutes, DOM.pomodoroSeconds, DOM.shortBreakMinutes, DOM.shortBreakSeconds, DOM.longBreakMinutes, DOM.longBreakSeconds];

export const initSettings = () => {
  DOM.settingsButton.addEventListener("click", toggleSettings);
  DOM.closeButton.addEventListener("click", handleClose);
  DOM.saveButton.addEventListener("click", handleSave);
  DOM.resetSettingsButton.addEventListener("click", handleReset);
  setupInputs();
};

const toggleSettings = () => DOM.settings.classList.toggle("hide");

const setupInputs = () => {
  inputs.forEach(input => {
      input.addEventListener("keypress", validateAllowedCharacters);
      input.value = setDefaultValue(input);
    });
};

const storeValues = input => {
  const { name, value } = input;
  localStorage.setItem(name, formatValue(value));
};

const formatValue = (value) => {
  if (value === "") {
    return 0;
  }
  return value.replace(LEADING_ZEROS, "");
};

const setDefaultValue = input => {
  const { name, typeDigit } = input.dataset;
  return checkIsLocaleStored(name) ? localStorage.getItem(LOCAL_STORAGE_VALUES[name][typeDigit]) : DEFAULT_TIMER_VALUES[name][typeDigit];
};

const handleClose = () => DOM.settings.classList.add("hide");

const handleSave = () => {
  if (validateInputs(inputs)) {
    inputs.forEach(input => storeValues(input));
    DOM.settings.classList.add("hide");
    refreshCurrentTimer();
  } else {
    displayErrors();
  }
};

const handleReset = () => {
  localStorage.clear();
  inputs.forEach(input => {
    const { name, typeDigit } = input.dataset;
    input.value = DEFAULT_TIMER_VALUES[name][typeDigit];
  });
  refreshCurrentTimer();
};

