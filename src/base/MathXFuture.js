export default class MathXFuture {
  static round(x, a) {
    if (a < 1) {
      const ra = parseInt(1 / a);
      return parseInt(x * ra + 0.5) / ra;
    } else {
      return parseInt(x / a + 0.5) * a;
    }
  }

  static randomInt(min, max) {
    return parseInt(Math.random() * (max - min)) + min;
  }

  static randomChoice(arr) {
    const n = arr.length;
    const randomI = MathXFuture.randomInt(0, n);
    return arr[randomI];
  }
}
