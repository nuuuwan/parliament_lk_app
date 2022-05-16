import { TimeX } from "@nuuuwan/utils-js-dev";
import { SECONDS_IN } from "../base/TimeXFuture.js";
import MPBase from "./MPBase.js";

const NO_DATA = "No Data";

function getPct(present, absent) {
  if (!present) {
    return null;
  }
  return parseInt((100 * present) / (present + absent) + 0.5) + "%";
}

function getAttendanceGroup(present, absent) {
  const Q = 10;
  if (!present) {
    return "No Data";
  }
  const p = present / (present + absent);
  if (p === 1) {
    return "All 100%";
  }
  const pLower = parseInt((p * 100) / Q) * Q;
  const pHigher = pLower + Q;
  return `${pLower} - ${pHigher}%`;
}

export default class MP extends MPBase {
  get age() {
    const utNow = TimeX.getUnixTime();
    const age = (utNow - this.dateOfBirthUT) / SECONDS_IN.YEAR;
    return age;
  }

  get ageFloor() {
    return parseInt(this.age);
  }

  get isNationalList() {
    return this.edName === "National List"
      ? "National List"
      : "Electoral Districts";
  }

  getAgeGroup(groupYears) {
    const age = this.age;
    const lower = Math.floor(age / groupYears) * groupYears;
    const upper = lower + groupYears;
    return `${lower} - ${upper}`;
  }

  isAgeOver(ageLimit) {
    if (this.age > ageLimit) {
      return `Age > ${ageLimit}`;
    }
    return `Age ≤ ${ageLimit}`;
  }

  get isSinhalaBuddhist() {
    if (this.religion === "Buddhism") {
      return "Sinhala Buddhist";
    }
    if (this.religion === "Other or Unknown") {
      return "Other or Unknown";
    }
    return "Not Sinhala Buddhist";
  }

  get ageAndDateOfBirth() {
    return parseInt(this.age) + " years";
  }

  get academicHighestLevelInt() {
    return parseInt(this.academicHighestLevel.substring(5, 6));
  }

  get isBachelorsOrHigher() {
    const academicHighestLevelInt = this.academicHighestLevelInt;
    if (academicHighestLevelInt === 0) {
      return NO_DATA;
    }
    if (academicHighestLevelInt >= 6) {
      return "Bachelors Or Higher";
    }
    return "Below Bachelors";
  }

  get isALevelsOrHigher() {
    const academicHighestLevelInt = this.academicHighestLevelInt;
    if (academicHighestLevelInt === 0) {
      return NO_DATA;
    }
    if (academicHighestLevelInt >= 3) {
      return "Advanced LevelsOr Higher";
    }
    return "Below Advanced Levels";
  }

  get monthOfBirth() {
    return parseInt(this.dateOfBirth.substring(5, 7));
  }

  get yearOfBirth() {
    return parseInt(this.dateOfBirth.substring(0, 4));
  }

  get hasDeclaredAssets() {
    if (
      this.assetDeclarationYears &&
      this.assetDeclarationYears.trim() !== ""
    ) {
      return "Declared";
    }
    return "Not Declared";
  }

  get attendance8th() {
    return getAttendanceGroup(
      this.attendance8thPresent,
      this.attendance8thAbsent
    );
  }

  get attendance9th() {
    return getAttendanceGroup(
      this.attendance9thPresent,
      this.attendance9thAbsent
    );
  }

  get attendance8thPct() {
    return getPct(this.attendance8thPresent, this.attendance8thAbsent);
  }

  get attendance9thPct() {
    return getPct(this.attendance9thPresent, this.attendance9thAbsent);
  }

  get initials() {
    return this.firstNames
      .split(" ")
      .map((s) => s.substring(0, 1))
      .join("");
  }

  get nameShort() {
    return this.initials + "-" + this.lastName.replace(" ", "");
  }

  get lastNameAndFirstNames() {
    return this.lastName + ", " + this.firstNames;
  }

  get idHref() {
    return this.id + "-" + this.nameShort;
  }

  get logString() {
    return this.idHref;
  }

  get generation() {
    let yearStart = 1883;
    const NAME_TO_YEAR_END = {
      "Lost Generation": 1901,
      "Greatest Generation": 1928,
      "Silent Generation": 1946,
      "Baby Boomers": 1965,
      "Generation X": 1981,
      "Millenials/Gen Y": 1997,
      "Zoomers/Gen Z": 2013,
      "Generation Alpha": 2022,
    };
    const yearOfBirth = this.yearOfBirth;

    for (let [name, yearEnd] of Object.entries(NAME_TO_YEAR_END)) {
      if (yearStart <= yearOfBirth && yearOfBirth < yearEnd) {
        return `(${yearStart} - ${yearEnd}) ${name}`;
      }
      yearStart = yearEnd;
    }
    return "Unknown";
  }

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
