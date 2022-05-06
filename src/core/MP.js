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
    this.urlNum = d.url_num;
    this.name = cleanName(d.name);
    this.imageURL = d.image_url;
    this.party = d.party;
    this.electoralDistrict = d.electoral_district;

    this.dateOfBirth = d.date_of_birth;
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

  static async getRawMPList() {
    return await WWW.json(URL_MP_LIST);
  }

  static async getMPList() {
    const mpRawList = await MP.getRawMPList();
    return mpRawList.map(function (d) {
      return new MP(d);
    });
  }
}
