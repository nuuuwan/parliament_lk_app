import MPBase from "./MPBase.js";

export default class MP extends MPBase {
  static cmpName(a, b) {
    const cmpLastName = a.lastName.localeCompare(b.lastName);
    if (cmpLastName) {
      return cmpLastName;
    }
    return a.firstNames.localeCompare(b.firstNames);
  }

  static cmpParty(a, b) {
    const cmpVote20A = a.vote20A.localeCompare(b.vote20A);
    if (cmpVote20A) {
      return cmpVote20A;
    }
    return a.party.localeCompare(b.party);
  }

  static async getMPList() {
    const mpRawList = await MPBase.getRawMPList();
    return mpRawList.map(function (d) {
      return new MP(d);
    });
  }

  static async getMPIdx() {
    const mpList = await MP.getMPList();
    return mpList.reduce(function (mpIdx, mp) {
      mpIdx[mp.id] = mp;
      return mpIdx;
    }, {});
  }

  static async getMPIdxHref() {
    const mpList = await MP.getMPList();
    return mpList.reduce(function (mpIdx, mp) {
      mpIdx[mp.idHref] = mp;
      return mpIdx;
    }, {});
  }
}
