import PersonProperties from "./PersonProperties.js";
const NA = "NA";
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

function getCabinet(cabinetData, cabinetLabel) {
  if (!cabinetData || cabinetData === NA) {
    return "Not in the " + cabinetLabel + " Cabinet";
  }
  return "In the " + cabinetLabel + " Cabinet";
}

export default class MPProperties extends PersonProperties {
  // Profile
  get idHref() {
    return this.id + "-" + this.nameShort;
  }

  get logString() {
    return this.idHref;
  }

  // Transparency & Corruption
  get hasDeclaredAssets() {
    if (
      this.assetDeclarationYears &&
      this.assetDeclarationYears.trim() !== ""
    ) {
      return "Declared";
    }
    return "Not Declared";
  }

  // Voting & Parliamentary Attandance
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

  get cabinet201911() {
    return getCabinet(this.cabinet201911Data, "2019 November");
  }
  get cabinet202008() {
    return getCabinet(this.cabinet202008Data, "2020 August");
  }
  get cabinet202204() {
    return getCabinet(this.cabinet202204Data, "2022 April");
  }
  get cabinet202205() {
    return getCabinet(this.cabinet202205Data, "2022 May");
  }
}
