export default class MathXFuture {
  static round(x, a) {
    if (a < 1) {
      const ra = parseInt(1 / a);
      return parseInt(x * ra + 0.5) / ra;
    } else {
      return parseInt(x / a + 0.5) * a;
    }
  }
}
