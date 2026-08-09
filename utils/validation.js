import {
  NOT_ALLOWED_CHARACTERS,
  LOCAL_STORAGE_VALUES,
  HTML_ELEMENTS,
} from "../consts/index.js";
import { getTimers } from "./timer.js";
import { getHTMLElement } from "./dom.js";

const errorMessage = getHTMLElement(HTML_ELEMENTS.ERROR_MESSAGE);
let errors = [];

export const validateInputs = inputs => {
  const timers = Object.values(getTimers(inputs));
  errors = [];
  if (timers.some(timer => timer.minutes === 0 && timer.seconds === 0)) {
    errors.push("Timer cannot start with zero values");
  }
  if (timers.some(timer => timer.minutes > 1440 || timer.seconds > 59)) {
    errors.push("Minutes cannot exceed 1440 (minutes) or 59 (seconds)");
  }
  if (errors.length !== 0) {
    errorMessage.style.display = "block";
    return false;
  }
  errorMessage.style.display = "none";
  return true;
}

export const displayErrors = () => {
  while (errorMessage.lastElementChild) {
    errorMessage.removeChild(errorMessage.lastElementChild);
  }
  errors.forEach(error => displayError(error));
};

const displayError = (text) => {
  let element = document.createElement("p");
  element.innerText = error;
  errorMessage.appendChild(element);
};

export const validateAllowedCharacters = e => {
  if (NOT_ALLOWED_CHARACTERS.includes(e.key)) {
    return e.preventDefault();
  }
  return null;
};

export const checkIsLocaleStored = name => (localStorage.getItem(LOCAL_STORAGE_VALUES[name].minutes) !== null) && (localStorage.getItem(LOCAL_STORAGE_VALUES[name].seconds) !== null);
