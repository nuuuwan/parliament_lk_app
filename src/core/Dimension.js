export default class Dimension {
  constructor(
      name,
      func,
      isSorted=false,
  ) {
    this.name = name;
    this.func = func;
    this.isSorted = isSorted;
  }
}
