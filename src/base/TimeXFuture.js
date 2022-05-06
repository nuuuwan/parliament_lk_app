export const SECONDS_IN = {
  YEAR: 86400 * 365.25,
};

export default class TimeXFuture {
  static parse(timeString) {
    const [dStr, mStr, yStr] = timeString.split("-");
    return Date.parse([yStr, mStr, dStr].join("-")) / 1000.0;
  }
}
