export const TABS = {
  POMODORO: 'POMODORO',
  SHORT_BREAK: 'SHORT_BREAK',
  LONG_BREAK: 'LONG_BREAK',
};

export const DEFAULT_TIMER_VALUES = {
  [TABS.POMODORO]: {
    min: 30,
    sec: 0,
  },
  [TABS.SHORT_BREAK]: {
    min: 5,
    sec: 0,
  },
  [TABS.LONG_BREAK]: {
    min: 15,
    sec: 0,
  },
};

export const DEFAULT_SOUNDTRACK_PATH = {
  [TABS.POMODORO]: 'assets/break.mp3',
  [TABS.SHORT_BREAK]: 'assets/backtowork.mp3',
  [TABS.LONG_BREAK]: 'assets/backtowork.mp3',
};

export const SOUNDTRACK_PLAYING_TIME = 2500;
