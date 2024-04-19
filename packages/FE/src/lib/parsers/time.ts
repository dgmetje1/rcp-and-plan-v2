const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

export const parseTime = (seconds: number) => {
  return `${seconds / SECONDS_IN_HOUR < 10 ? "0" : ""}${Math.floor(seconds / SECONDS_IN_HOUR)}:${(seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE < 10 ? "0" : ""}${Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)}`;
};

export const printTime = (seconds: number) => {
  return `${parseTime(seconds)} hours`;
};
