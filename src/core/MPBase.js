import { WWW } from "@nuuuwan/utils-js-dev";
import MPProperties from "./MPProperties.js";

const URL_MP_LIST =
  "https://raw.githubusercontent.com/" +
  "nuuuwan/parliament_lk/data/" +
  "expanded_mp_list.json";

export default class MPBase extends MPProperties {
  constructor(d) {
    super();
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

    this.attendance8thPresent = d.attendance_8th_present;
    this.attendance8thAbsent = d.attendance_8th_absent;

    this.attendance9thPresent = d.attendance_9th_present;
    this.attendance9thAbsent = d.attendance_9th_absent;

    this.cabinet201911Data = d.cabinet_201911;
    this.cabinet202008Data = d.cabinet_202008;
    this.cabinet202204Data = d.cabinet_202204;
    this.cabinet202205Data = d.cabinet_202205;
  }

  static async getRawMPList() {
    return await WWW.json(URL_MP_LIST);
  }
}
