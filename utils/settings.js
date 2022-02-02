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
const errorMessage = document.getElementById('error-message');
let errors = [];

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
  errors = [];
  if (timers.some(timer => timer.minutes === 0 && timer.seconds === 0)) {
    errors.push('Timer cannot start with zero values');
  }
  if (timers.some(timer => timer.minutes > 1440 || timer.seconds > 59)) {
    errors.push('Minutes cannot exceed 1440 (minutes) or 59 (seconds)');
  }
  if (errors.length !== 0) {
    errorMessage.style.display = 'visible';
    return false;
  }
  errorMessage.style.display = 'none';
  return true;;
}

const displayErrors = () => {
  while (errorMessage.lastElementChild) {
    errorMessage.removeChild(errorMessage.lastElementChild);
  }
  errors.map(error => {
    let element = document.createElement('p');
    element.innerText = error;
    errorMessage.appendChild(element);
  });
};

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
  if (validateInputs(inputs)) {
    inputs.forEach(input => storeValues(input));
    settings.classList.add('hide');
    initTabs();
    initTimer();
  } else {
    displayErrors();
  }
});

inputs.forEach(input => {
  input.addEventListener('keypress', validateAllowedCharacters);
  input.value = setDefaultValue(input);
});

export default toggleSettings;
