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
  new Party("OPPP", "maroon"),

  new Party("SLFP", "blue"),

  new Party("SJB", "green"),
  new Party("UNP", "green"),

  new Party("JJB", "red"),

  new Party("ITAK", "yellow"),
  new Party("TMTK", "yellow"),
  new Party("EPDP", "yellow"),
  new Party("AITC", "yellow"),
  new Party("TMVP", "yellow"),

  new Party("NC", "darkgreen"),
  new Party("MNA", "darkgreen"),
  new Party("SLMC", "darkgreen"),
  new Party("ACMC", "darkgreen"),
];

export const PARTY_IDX = DataStructuresFuture.buildIndex(
  PARTY_LIST,
  (party) => party.name
);
