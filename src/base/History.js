const CACHE_KEY_HISTORY = "history";
export default class History {
  constructor(appName) {
    this.appName = appName;
    this.stateList = this.getStateList();
    this.cursor = this.length - 1;
  }

  get cacheKey() {
    return CACHE_KEY_HISTORY + "." + this.appName;
  }

  get length() {
    return this.stateList.length;
  }

  getRaw() {
    return localStorage.getItem(this.cacheKey);
  }

  setRaw(rawContent) {
    localStorage.setItem(this.cacheKey, rawContent);
  }

  getStateList() {
    const rawContent = this.getRaw();
    if (rawContent) {
      return JSON.parse(rawContent);
    }
    return [];
  }

  setStateList(stateList) {
    const rawContent = JSON.stringify(stateList);
    this.setRaw(rawContent);
  }

  setState(state) {
    this.stateList.push(state);
    this.setStateList(this.stateList);
  }

  getState() {
    return this.stateList[this.length - 1];
  }

  gotoPrev() {
    if (this.cursor > 0) {
      return this.stateList.pop();
    }
    return null;
  }
}
