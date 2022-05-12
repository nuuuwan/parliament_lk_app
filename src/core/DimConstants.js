import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import CelebrationIcon from "@mui/icons-material/Celebration";

import DataStructuresFuture from "../base/DataStructuresFuture.js";
import Dim from "./Dim.js";
import DimGroup from "./DimGroup.js";

export const DIM_GROUP_LIST = [
  new DimGroup("Political Parties", GroupsIcon),
  new DimGroup("Electoral Regions", LocationOnIcon),
  new DimGroup("Voting & Parliamentary Attandance", HowToVoteIcon),
  new DimGroup("Transparency & Corruption", LocalPoliceIcon),
  new DimGroup("Education & Profession", SchoolIcon),
  new DimGroup("Demographics", FamilyRestroomIcon),
  new DimGroup("Religion & Ethnicity", TempleBuddhistIcon),
  new DimGroup("Miscellaneous & Fun", CelebrationIcon),
];

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

export const DIM_GROUP_NAME_TO_DIM_NAME = {
  "Political Parties": ["Party"],
  "Education & Profession": [
    "Highest Education Level",
    "Has Bachelors or higher?",
    "Has Advanced Levels or higher?",
    "Profession",
  ],
  "Voting & Parliamentary Attandance": [
    "Voting for 20th Amendment",
    "Attandance 9th Parliament (2020 - )",
    "Attandance 8th Parliament (2017 - 2020)",
  ],
  "Transparency & Corruption": ["Has Publicly Declared Assets?"],
  Demographics: [
    "Age Group (5 year)",
    "Age Group (10 year)",
    "Is Age > 40",
    "Is Age > 50",
    "Generation",
    "Gender",
    "Civil Status",
  ],
  "Electoral Regions": ["Is National List?", "Electoral District", "Province"],
  "Religion & Ethnicity": ["Religion", "Is Sinhala Buddhist?"],
  "Miscellaneous & Fun": [
    "Last Name",
    "First Letter of First Name",
    "Month of Birth",
    "Show All",
    "Show Random",
  ],
};

// Derived
export const DIM_GROUP_IDX = DataStructuresFuture.buildIndex(
  DIM_GROUP_LIST,
  (dimGroup) => dimGroup.name
);

export const DIM_IDX = DataStructuresFuture.buildIndex(
  DIM_LIST,
  (dim) => dim.name
);

export const DIM_GROUP_NAME_TO_DIM_LIST = Object.entries(
  DIM_GROUP_NAME_TO_DIM_NAME
).reduce(function (DIM_GROUP_NAME_TO_DIM_LIST, [dimGroupName, dimNameList]) {
  DIM_GROUP_NAME_TO_DIM_LIST[dimGroupName] = dimNameList.map(function (
    dimName
  ) {
    return DIM_IDX[dimName];
  });
  return DIM_GROUP_NAME_TO_DIM_LIST;
}, {});
