export const TABS = {
  POMODORO: 'POMODORO',
  SHORT_BREAK: 'SHORT_BREAK',
  LONG_BREAK: 'LONG_BREAK',
};

export const DEFAULT_TIMER_VALUES = {
  [TABS.POMODORO]: {
    minutes: 30,
    seconds: 0,
  },
  [TABS.SHORT_BREAK]: {
    minutes: 5,
    seconds: 0,
  },
  [TABS.LONG_BREAK]: {
    minutes: 15,
    seconds: 0,
  },
};

export const LOCAL_STORAGE_VALUES = {
  [TABS.POMODORO]: {
    minutes: 'pomodoroMinutes',
    seconds: 'pomodoroSeconds',
  },
  [TABS.SHORT_BREAK]: {
    minutes: 'shortBreakMinutes',
    seconds: 'shortBreakSeconds',
  },
  [TABS.LONG_BREAK]: {
    minutes: 'longBreakMinutes',
    seconds: 'longBreakSeconds',
  },
};

export const DEFAULT_SOUNDTRACK_PATH = {
  [TABS.POMODORO]: 'assets/break.mp3',
  [TABS.SHORT_BREAK]: 'assets/backtowork.mp3',
  [TABS.LONG_BREAK]: 'assets/backtowork.mp3',
};

export const SOUNDTRACK_PLAYING_TIME = 2500;

export const NOT_ALLOWED_CHARACTERS = ['-', 'e', 'E', '+', '.'];

export const LEADING_ZEROS = /^0+(?=\d)/;

export const HTML_ELEMENTS = {
  START_BUTTON: "START_BUTTON",
  SETTINGS_BUTTON: "SETTINGS_BUTTON",
  RESET_SETTOMGS_BUTTON: "RESET_SETTOMGS_BUTTON",
  CLOSE_BUTTON: "CLOSE_BUTTON",
  SAVE_BUTTON: "SAVE_BUTTON",
  TABS: "TABS",
  SETTINGS: "SETTINGS",
  POMODORO_MINUTES_INPUT: "POMODORO_MINUTES_INPUT",
  POMODORO_SECONDS_INPUT: "POMODORO_SECONDS_INPUT",
  SHORT_BREAK_MINUTES_INPUT: "SHORT_BREAK_MINUTES_INPUT",
  SHORT_BREAK_SECONDS_INPUT: "SHORT_BREAK_SECONDS_INPUT",
  LONG_BREAK_MINUTES_INPUT: "LONG_BREAK_MINUTES_INPUT",
  LONG_BREAK_SECONDS_INPUT: "LONG_BREAK_SECONDS_INPUT",
  MINUTES_BLOCK: "MINUTES_BLOCK",
  SECONDS_BLOCK: "SECONDS_BLOCK",
  ERROR_MESSAGE: "ERROR_MESSAGE",
};
