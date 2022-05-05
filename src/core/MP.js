import { WWW } from "@nuuuwan/utils-js-dev";

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

  static async getAllRaw() {
    return await WWW.json(URL_MP_LIST);
  }

  static async getAll() {
    const mpRawList = await MP.getAllRaw();
    return mpRawList.map(function (d) {
      return new MP(d);
    });
  }
}
