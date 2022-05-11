import DataStructuresFuture from "../base/DataStructuresFuture.js";

class Party {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

// constants

export const PARTY_LIST = [
  new Party("SLPP", "maroon"),
  new Party("SJB", "green"),
  new Party("JJB", "red"),
  new Party("ITAK", "yellow"),
];

export const PARTY_IDX = DataStructuresFuture.buildIndex(
  PARTY_LIST,
  (party) => party.name
);
