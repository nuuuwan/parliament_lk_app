import { WWW, TimeX } from "@nuuuwan/utils-js-dev";
import { SECONDS_IN } from "../base/TimeXFuture.js";

const URL_MP_LIST =
  "https://raw.githubusercontent.com/" +
  "nuuuwan/parliament_lk/data/" +
  "expanded_mp_list.json";

const NO_DATA = "No Data";

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

export default class MP {
  constructor(d) {
    this.d = d;

    this.id = parseInt(d.id);
    this.name = d.name_cleaned;
    this.firstNames = d.first_names;
    this.lastName = d.last_name;
    this.gender = d.gender;
    this.imageURL = d.image_url;
    this.imageURLLocal =
      process.env.PUBLIC_URL + "/mp_images/" + this.id + ".jpg";
    this.party = d.party_short;
    this.edName = d.ed_name;
    this.provinceName = d.province_name;

    this.dateOfBirth = d.date_of_birth_norm;
    this.dateOfBirthUT = d.date_of_birth_ut;

    this.civilStatus = d.civil_status_cleaned;
    this.religion = d.religion_cleaned;

    this.profession = d.profession;
    this.phone = d.phone_norm;
    this.address = d.address;
    this.phoneSitting = d.phone_sitting_norm;
    this.addressSitting = d.address_sitting;
    this.email = d.email;

    this.academicQualifications = d.academic_qualifications;
    this.academicHighestLevel = "ISCED" + d.academic_highest_level;
    this.professionalQualifications = d.professional_qualifications;

    this.vote20A = d.vote_20th_amendment;
    this.assetDeclarationYears = d.asset_declaration_years;

    this.sourceURL = d.source_url;

    this.attendance9thPresent = d.attendance_9th_present;
    this.attendance9thAbsent = d.attendance_9th_absent;

    this.attendance8thPresent = d.attendance_8th_present;
    this.attendance8thAbsent = d.attendance_8th_absent;
  }

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

  get initials() {
    return this.firstNames
      .split(" ")
      .map((s) => s.substring(0, 1))
      .join("");
  }

  get nameShort() {
    return this.initials + "-" + this.lastName.replace(" ", "");
  }

  get logString() {
    return this.id + "-" + this.nameShort;
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

  static async getRawMPList() {
    return await WWW.json(URL_MP_LIST);
  }

  static async getMPList() {
    const mpRawList = await MP.getRawMPList();
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
}
