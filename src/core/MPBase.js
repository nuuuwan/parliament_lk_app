import { WWW } from "@nuuuwan/utils-js-dev";

const URL_MP_LIST =
  "https://raw.githubusercontent.com/" +
  "nuuuwan/parliament_lk/data/" +
  "expanded_mp_list.json";

export default class MPBase {
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

  static async getRawMPList() {
    return await WWW.json(URL_MP_LIST);
  }

  static async getMPList() {
    const mpRawList = await MPBase.getRawMPList();
    return mpRawList.map(function (d) {
      return new MPBase(d);
    });
  }

  static async getMPIdx() {
    const mpList = await MPBase.getMPList();
    return mpList.reduce(function (mpIdx, mp) {
      mpIdx[mp.id] = mp;
      return mpIdx;
    }, {});
  }
}
