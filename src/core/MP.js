import { WWW, TimeX } from "@nuuuwan/utils-js-dev";
import { SECONDS_IN } from "../base/TimeXFuture.js";

const URL_MP_LIST =
  "https://raw.githubusercontent.com/" +
  "nuuuwan/parliament_lk/data/" +
  "expanded_mp_list.json";

export default class MP {
  constructor(d) {
    this.d = d;

    this.id = parseInt(d.id);
    this.name = d.name_cleaned;
    this.firstNames = d.first_names;
    this.lastName = d.last_name;
    this.gender = d.gender;
    this.imageURL = d.image_url;
    this.party = d.party_short;
    this.edName = d.ed_name;
    this.provinceName = d.province_name;

    this.dateOfBirth = d.date_of_birth_norm;
    this.dateOfBirthUT = d.date_of_birth_ut;

    this.civilStatus = d.civil_status;
    this.religion = d.religion_cleaned;

    this.profession = d.profession;
    this.phone = d.phone_norm;
    this.address = d.address;
    this.phoneSitting = d.phone_sitting_norm;
    this.addressSitting = d.address_sitting;
    this.email = d.email;

    this.academicQualifications = d.academic_qualifications;
    this.academicHighestLevel = d.academic_highest_level;
    this.professionalQualifications = d.professional_qualifications;

    this.sourceURL = d.source_url;
  }

  get age() {
    const utNow = TimeX.getUnixTime();
    const age = (utNow - this.dateOfBirthUT) / SECONDS_IN.YEAR;
    return age;
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
    return parseInt(this.age) + ' years';
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
