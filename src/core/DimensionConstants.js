import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import CelebrationIcon from "@mui/icons-material/Celebration";

import Dimension from './Dimension.js';
import DimensionGroup from './DimensionGroup.js';

const DIMENSION_GROUP_LIST = [
    new DimensionGroup("Political Parties",  GroupsIcon),
    new DimensionGroup("Education & Profession",  SchoolIcon),
    new DimensionGroup("Voting & Parliamentary Attandance",  HowToVoteIcon),
    new DimensionGroup("Transparency & Corruption",  LocalPoliceIcon),
    new DimensionGroup("Demographics",  FamilyRestroomIcon),
    new DimensionGroup("Electoral Regions",  LocationOnIcon),
    new DimensionGroup("Religion & Ethnicity",  TempleBuddhistIcon),
    new DimensionGroup("Miscellaneous & Fun",  CelebrationIcon),
];

export const GROUP_TO_DIMENSION_LIST = {
  "Political Parties": [
    new Dimension("Party", (mp) => mp.party),
  ],
  "Education & Profession": [
    new Dimension("Highest Education Level", (mp) => mp.academicHighestLevel),
    new Dimension("Has Bachelors or higher?", (mp) => mp.isBachelorsOrHigher),
    new Dimension("Has Advanced Levels or higher?", (mp) => mp.isALevelsOrHigher),
    new Dimension("Profession", (mp) => mp.profession),
  ],
  "Voting & Parliamentary Attandance": [
  new Dimension(  "Voting for 20th Amendment", (mp) => mp.vote20A),
    new Dimension("Attandance 9th Parliament (2020 - )", (mp) => mp.attendance9th),
    new Dimension("Attandance 8th Parliament (2017 - 2020)", (mp) => mp.attendance8th),
  ],
  "Transparency & Corruption": [
    new Dimension("Has Publicly Declared Assets?", (mp) => mp.hasDeclaredAssets),
  ],
  "Demographics": [
    new Dimension("Age Group (5 year)", (mp) => mp.getAgeGroup(5)),
    new Dimension("Age Group (10 year)", (mp) => mp.getAgeGroup(10)),
    new Dimension("Is Age > 40", (mp) => mp.isAgeOver(40)),
    new Dimension("Is Age > 50", (mp) => mp.isAgeOver(50)),
    new Dimension("Generation", (mp) => mp.generation),
    new Dimension("Gender", (mp) => mp.gender),
    new Dimension("Civil Status", (mp) => mp.civilStatus),
  ],
  "Electoral Regions": [
    new Dimension("Is National List?", (mp) => mp.isNationalList),
    new Dimension("Electoral District", (mp) => mp.edName),
    new Dimension("Province", (mp) => mp.provinceName),
  ],
  "Religion & Ethnicity": [
    new Dimension("Religion", (mp) => mp.religion),
    new Dimension("Is Sinhala Buddhist?", (mp) => mp.isSinhalaBuddhist),
  ],
  "Miscellaneous & Fun": [
    new Dimension("Last Name", (mp) => mp.lastName),
    new Dimension("First Letter of First Name", (mp) => mp.firstNames.substring(0, 1)),
    new Dimension("Month of Birth", (mp) => mp.monthOfBirth),
    new Dimension("Show All", (mp) => "All"),
    new Dimension("Show Random", (mp) => "Random Group " + parseInt(Math.random() * 5 + 1)),
  ],
};

export const SORTED_DIMENSION_LIST = [
  "Age Group (5 year)",
  "Age Group (10 year)",
  "Highest Education Level",
  "Show Random",
  "Attandance 9th Parliament (2020 - )",
  "Attandance 8th Parliament (2017 - 2020)",
  "Generation",
];

// Derived
export const GROUP_TO_ICON = DIMENSION_GROUP_LIST.reduce(
  function(GROUP_TO_ICON, dimensionGroup) {
      GROUP_TO_ICON[dimensionGroup.name] = dimensionGroup.Icon;
      return GROUP_TO_ICON;
  },
  {},
)

export const DIMENSION_TO_FUNC = Object.values(
  GROUP_TO_DIMENSION_LIST
).reduce(function (DIMENSION_TO_FUNC, dimensionList) {
  return dimensionList.reduce(function (DIMENSION_TO_FUNC, dimension) {
    DIMENSION_TO_FUNC[dimension.name] = dimension.func;
    return DIMENSION_TO_FUNC;
  }, DIMENSION_TO_FUNC);
}, {});

export const DIMENSION_LIST = Object.keys(DIMENSION_TO_FUNC);
