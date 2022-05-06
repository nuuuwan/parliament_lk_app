import { WWW, TimeX } from "@nuuuwan/utils-js-dev";
import TimeXFuture, { SECONDS_IN } from "../base/TimeXFuture.js";

const URL_MP_LIST =
  "https://raw.githubusercontent.com/" +
  "nuuuwan/parliament_lk/data/" +
  "mp_list.json";

function cleanName(nameRaw) {
  return nameRaw.replace("Hon.", "").replace(", M.P.", "").trim();
}

export default class MP {
  constructor(d) {
    this.urlNum = parseInt(d.url_num);
    this.name = cleanName(d.name);
    this.imageURL = d.image_url;
    this.party = d.party;
    this.electoralDistrict = d.electoral_district;

    this.dateOfBirthData = d.date_of_birth;
    this.civilStatus = d.civil_status;
    this.religion = d.religion;
    this.profession = d.profession;
    this.phone = d.phone;

    this.address = d.address;
    this.phoneSitting = d.phone_sitting;
    this.addressSitting = d.address_sitting;
    this.email = d.email;
    this.sourceURL = d.source_url;
  }

  get id() {
    return this.urlNum;
  }

  get age() {
    const utNow = TimeX.getUnixTime();
    const utDateOfBirth = TimeXFuture.parse(this.dateOfBirth);
    const age = (utNow - utDateOfBirth) / SECONDS_IN.YEAR;
    return age;
  }

  get dateOfBirth() {
    if (this.dateOfBirthData) {
      return this.dateOfBirthData;
    }
    const CUSTOM_DATE_OF_BIRTH = {
      1575: "27-04-1951", // Basil Rohana Rajapaksa
      3451: "01-10-1971", // Jagath Kumara Sumithraarachchi
      3364: "07-10-1974", // Lalith Varna Kumara
    };
    if (CUSTOM_DATE_OF_BIRTH[this.id]) {
      return CUSTOM_DATE_OF_BIRTH[this.id];
    }
    console.warn("No dateOfBirth for " + this.name + this.id);
    return "01-01-1970";
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
