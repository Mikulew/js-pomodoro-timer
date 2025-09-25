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