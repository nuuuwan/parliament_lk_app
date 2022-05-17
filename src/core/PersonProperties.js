import { TimeX } from "@nuuuwan/utils-js-dev";
import { SECONDS_IN } from "../base/TimeXFuture.js";

const NO_DATA = "No Data";

export default class PersonProperties {
  // Profile
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

  // Demographics
  get age() {
    const utNow = TimeX.getUnixTime();
    const age = (utNow - this.dateOfBirthUT) / SECONDS_IN.YEAR;
    return age;
  }

  get ageFloor() {
    return parseInt(this.age);
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

  get ageAndDateOfBirth() {
    return parseInt(this.age) + " years";
  }

  get monthOfBirth() {
    return parseInt(this.dateOfBirth.substring(5, 7));
  }

  get yearOfBirth() {
    return parseInt(this.dateOfBirth.substring(0, 4));
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

  // Religion & Ethnicity
  get isSinhalaBuddhist() {
    if (this.religion === "Buddhism") {
      return "Sinhala Buddhist";
    }
    if (this.religion === "Other or Unknown") {
      return "Other or Unknown";
    }
    return "Not Sinhala Buddhist";
  }

  // Education & Profession
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
}
