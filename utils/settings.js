import {
  DEFAULT_TIMER_VALUES,
  LOCAL_STORAGE_VALUES,
  NOT_ALLOWED_CHARACTERS,
} from '../consts/index.js';
import { initTimer, getTimers } from '../utils/timer.js';
import { initTabs } from '../utils/tabs.js';

const settings = document.getElementById('settings');
const settingsButton = document.getElementById('settingsButton');
const closeButton = document.getElementById('closeButton');
const saveButton = document.getElementById('save');
const pomodoroMinutes = document.getElementById('pomodoro-minutes');
const pomodoroSeconds = document.getElementById('pomodoro-seconds');
const shortBreakMinutes = document.getElementById('short-break-minutes');
const shortBreakSeconds = document.getElementById('short-break-seconds');
const longBreakMinutes = document.getElementById('long-break-minutes');
const longBreakSeconds = document.getElementById('long-break-seconds');
const inputs = [pomodoroMinutes, pomodoroSeconds, shortBreakMinutes, shortBreakSeconds, longBreakMinutes, longBreakSeconds];
const errorText = document.getElementById('error-text');

export const initSettings = () => settingsButton.addEventListener('click', () => toggleSettings());

const toggleSettings = () => {
  if (settings.classList.contains('hide')) {
    settings.classList.remove('hide');
  } else {
    settings.classList.add('hide');
  }
};

const validateAllowedCharacters = e => {
  if (NOT_ALLOWED_CHARACTERS.includes(e.key)) {
    return e.preventDefault();
  }
  return null;
};

const validateInputs = inputs => {
  const timers = Object.values(getTimers(inputs));
  return !timers.some(timer => timer.minutes === 0 && timer.seconds === 0);
}

const storeValues = input => {
  const { name, value } = input;
  localStorage.setItem(name, value === '' ? 0 : value);
};

const setDefaultValue = input => {
  const { name, typeDigit } = input.dataset;
  const isLocaleStorage = (localStorage.getItem(LOCAL_STORAGE_VALUES[name].minutes) !== null) && (localStorage.getItem(LOCAL_STORAGE_VALUES[name].seconds) !== null);
  return isLocaleStorage ? localStorage.getItem(LOCAL_STORAGE_VALUES[name][typeDigit]) : DEFAULT_TIMER_VALUES[name][typeDigit];
};

closeButton.addEventListener('click', () => settings.classList.add('hide'));

saveButton.addEventListener('click', () => {
  errorText.innerText = '';
  if (validateInputs(inputs)) {
    inputs.forEach(input => storeValues(input));
    settings.classList.add('hide');
    initTabs();
    initTimer();
  } else {
    errorText.innerText = 'Timer cannot start with zero values';
  }
});

inputs.forEach(input => {
  input.addEventListener('keypress', validateAllowedCharacters);
  input.value = setDefaultValue(input);
});

export default toggleSettings;
