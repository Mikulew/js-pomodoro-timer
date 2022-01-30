import { NOT_ALLOWED_CHARACTERS } from '../consts/index.js';

const settings = document.getElementById('settings');
const closeButton = document.getElementById('closeButton');
const saveButton = document.getElementById('save');
const pomodoroMinutes = document.getElementById('pomodoro-minutes');
const pomodoroSeconds = document.getElementById('pomodoro-seconds');
const shortBreakMinutes = document.getElementById('short-break-minutes');
const shortBreakSeconds = document.getElementById('short-break-seconds');
const longBreakMinutes = document.getElementById('long-break-minutes');
const longBreakSeconds = document.getElementById('long-break-seconds');
const inputs = [pomodoroMinutes, pomodoroSeconds, shortBreakMinutes, shortBreakSeconds, longBreakMinutes, longBreakSeconds];

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

closeButton.addEventListener('click', () => settings.classList.add('hide'));

saveButton.addEventListener('click', () => console.log('save – to do'));

inputs.forEach(input => {
  input.addEventListener('keypress', validateAllowedCharacters);
});

export default toggleSettings;
