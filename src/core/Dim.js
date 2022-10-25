import { DataStructures } from "@nuuuwan/utils-js-dev";

export default class Dim {
  constructor(name, func, isSorted = false) {
    this.name = name;
    this.func = func;
    this.isSorted = isSorted;
  }

  map(mpList) {
    return mpList.map(this.func);
  }
}

// Constants

export const DIM_LIST = [
  new Dim("Party", (mp) => mp.party),
  new Dim("Highest Education Level", (mp) => mp.academicHighestLevel, true),
  new Dim("Has Bachelors or higher?", (mp) => mp.isBachelorsOrHigher),
  new Dim("Has Advanced Levels or higher?", (mp) => mp.isALevelsOrHigher),
  new Dim("Profession", (mp) => mp.profession),
  new Dim("Voting for 20th Amendment", (mp) => mp.vote20A),
  new Dim(
    "Attandance 9th Parliament (2020 - )",
    (mp) => mp.attendance9th,
    true
  ),
  new Dim(
    "Attandance 8th Parliament (2017 - 2020)",
    (mp) => mp.attendance8th,
    true
  ),
  new Dim("Was in 2019 Nov Cabinet?", (mp) => mp.cabinet201911, true),
  new Dim("Was in 2020 Aug Cabinet?", (mp) => mp.cabinet202008, true),
  new Dim("Was in 2022 Apr Cabinet?", (mp) => mp.cabinet202204, true),
  new Dim("Was in 2022 May Cabinet?", (mp) => mp.cabinet202205, true),
  new Dim(
    "Number of Cabinets (since 2019 Nov)",
    (mp) => mp.numberOfCabinets,
    true
  ),

  new Dim("Has Publicly Declared Assets?", (mp) => mp.hasDeclaredAssets),
  new Dim("Age Group (5 year)", (mp) => mp.getAgeGroup(5), true),
  new Dim("Age Group (10 year)", (mp) => mp.getAgeGroup(10), true),
  new Dim("Is Age > 40", (mp) => mp.isAgeOver(40)),
  new Dim("Is Age > 50", (mp) => mp.isAgeOver(50)),
  new Dim("Generation", (mp) => mp.generation, true),
  new Dim("Gender", (mp) => mp.gender),
  new Dim("Civil Status", (mp) => mp.civilStatus),
  new Dim("Is National List?", (mp) => mp.isNationalList),
  new Dim("Electoral District", (mp) => mp.edName),
  new Dim("Province", (mp) => mp.provinceName),
  new Dim("Religion", (mp) => mp.religion),
  new Dim("Is Sinhala Buddhist?", (mp) => mp.isSinhalaBuddhist),
  new Dim("Last Name", (mp) => mp.lastName),
  new Dim("First Letter of First Name", (mp) => mp.firstNames.substring(0, 1)),
  new Dim("Month of Birth", (mp) => mp.monthOfBirth),
  new Dim("Show All", (mp) => "All"),
  new Dim(
    "Show Random",
    (mp) => "Random Group " + parseInt(Math.random() * 5 + 1)
  ),
  true,
];

export const DIM_IDX = DataStructures.buildIndex(DIM_LIST, (dim) => dim.name);
