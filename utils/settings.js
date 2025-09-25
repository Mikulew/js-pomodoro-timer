import {
  DEFAULT_TIMER_VALUES,
  LOCAL_STORAGE_VALUES,
  LEADING_ZEROS,
} from '../consts/index.js';
import { initTimer } from '../utils/timer.js';
import { initTabs } from '../utils/tabs.js';
import {
  validateAllowedCharacters,
  validateInputs,
  displayErrors,
  checkIsLocaleStored,
} from '../utils/validation.js';

const settings = document.getElementById('settings');
const settingsButton = document.getElementById('settingsButton');
const closeButton = document.getElementById('closeButton');
const saveButton = document.getElementById('save');
const resetSettingsButton = document.getElementById('resetSettings');
const pomodoroMinutes = document.getElementById('pomodoro-minutes');
const pomodoroSeconds = document.getElementById('pomodoro-seconds');
const shortBreakMinutes = document.getElementById('short-break-minutes');
const shortBreakSeconds = document.getElementById('short-break-seconds');
const longBreakMinutes = document.getElementById('long-break-minutes');
const longBreakSeconds = document.getElementById('long-break-seconds');
const inputs = [pomodoroMinutes, pomodoroSeconds, shortBreakMinutes, shortBreakSeconds, longBreakMinutes, longBreakSeconds];

export const initSettings = () => settingsButton.addEventListener('click', () => toggleSettings());

const toggleSettings = () => {
  if (settings.classList.contains('hide')) {
    settings.classList.remove('hide');
  } else {
    settings.classList.add('hide');
  }
};

const storeValues = input => {
  const { name, value } = input;
  localStorage.setItem(name, formatValue(value));
};

const formatValue = (value) => {
  if (value === '') {
    return 0;
  }
  return value.replace(LEADING_ZEROS, '');
};

const setDefaultValue = input => {
  const { name, typeDigit } = input.dataset;
  return checkIsLocaleStored(name) ? localStorage.getItem(LOCAL_STORAGE_VALUES[name][typeDigit]) : DEFAULT_TIMER_VALUES[name][typeDigit];
};

closeButton.addEventListener('click', () => settings.classList.add('hide'));

saveButton.addEventListener('click', () => {
  if (validateInputs(inputs)) {
    inputs.forEach(input => storeValues(input));
    settings.classList.add('hide');
    initTabs();
    initTimer();
  } else {
    displayErrors();
  }
});

resetSettingsButton.addEventListener('click', () => {
  localStorage.clear();
  inputs.forEach(input => {
    const { name, typeDigit } = input.dataset;
    input.value = DEFAULT_TIMER_VALUES[name][typeDigit];
  });
});

inputs.forEach(input => {
  input.addEventListener('keypress', validateAllowedCharacters);
  input.value = setDefaultValue(input);
});
