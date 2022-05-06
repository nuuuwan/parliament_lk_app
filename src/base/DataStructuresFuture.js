export default class DataStructuresFuture {
  static initArray(n, funcDefaultValue) {
    return [...Array(n).keys()].map((i) => funcDefaultValue(i));
  }

  static initArray2D(nX, nY, funcDefaultValue) {
    return DataStructuresFuture.initArray(nX, (iX) =>
      DataStructuresFuture.initArray(nY, (iY) => funcDefaultValue(iX, iY))
    );
  }

  static range(min, max) {
    const span = max - min;
    return DataStructuresFuture.initArray(span, (i) => i + min);
  }

  static unique(arr) {
    return [...new Set(arr)];
  }

  static buildReverseIndex(arr) {
    return arr.reduce(function (reverseIndex, x, i) {
      reverseIndex[x] = i;
      return reverseIndex;
    }, {});
  }
}
