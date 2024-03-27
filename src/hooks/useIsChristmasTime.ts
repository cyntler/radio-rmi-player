const christmasTimeRange = {
  month: 11,
  datesFrom: 22,
  datesTo: 28,
};

export const useIsChristmasTime = () =>
  new Date().getMonth() === christmasTimeRange.month &&
  new Date().getDate() >= christmasTimeRange.datesFrom &&
  new Date().getDate() <= christmasTimeRange.datesTo;
