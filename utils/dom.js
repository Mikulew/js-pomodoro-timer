import { HTML_ELEMENTS } from "../consts/index.js";

const DOM_ELEMENTS = {
  [HTML_ELEMENTS.START_BUTTON]: document.getElementById("start"),
  [HTML_ELEMENTS.SETTINGS_BUTTON]: document.getElementById("settingsButton"),
  [HTML_ELEMENTS.RESET_SETTOMGS_BUTTON]: document.getElementById("resetSettings"),
  [HTML_ELEMENTS.CLOSE_BUTTON]: document.getElementById("closeButton"),
  [HTML_ELEMENTS.SAVE_BUTTON]: document.getElementById("save"),
  [HTML_ELEMENTS.TABS]: document.querySelectorAll(".tab"),
  [HTML_ELEMENTS.SETTINGS]: document.getElementById("settings"),
  [HTML_ELEMENTS.POMODORO_MINUTES_INPUT]: document.getElementById("pomodoro-minutes"),
  [HTML_ELEMENTS.POMODORO_SECONDS_INPUT]: document.getElementById("pomodoro-seconds"),
  [HTML_ELEMENTS.SHORT_BREAK_MINUTES_INPUT]: document.getElementById("short-break-minutes"),
  [HTML_ELEMENTS.SHORT_BREAK_SECONDS_INPUT]: document.getElementById("short-break-seconds"),
  [HTML_ELEMENTS.LONG_BREAK_MINUTES_INPUT]: document.getElementById("long-break-minutes"),
  [HTML_ELEMENTS.LONG_BREAK_SECONDS_INPUT]: document.getElementById("long-break-seconds"),
  [HTML_ELEMENTS.MINUTES_BLOCK]: document.getElementById("minutes"),
  [HTML_ELEMENTS.SECONDS_BLOCK]: document.getElementById("seconds"),
  [HTML_ELEMENTS.ERROR_MESSAGE]: document.getElementById("error-message"),
};

export function getHTMLElement(element) {
  return DOM_ELEMENTS[element];
}
