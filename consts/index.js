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
