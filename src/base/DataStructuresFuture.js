export default class DataStructuresFuture {
  static initArray(n, funcDefaultValue) {
    return [...Array(n).keys()].map(i => funcDefaultValue(i));
  }

  static initArray2D(nX, nY, funcDefaultValue) {
    return DataStructuresFuture.initArray(
      nX,
      iX => DataStructuresFuture.initArray(
          nY,
          iY => funcDefaultValue(iX, iY),
      )
    );
  }

  static range(min, max) {
    const span = max - min;
    return DataStructuresFuture.initArray(span, i => i + min);
  }


}
