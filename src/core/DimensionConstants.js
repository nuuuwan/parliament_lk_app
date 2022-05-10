import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import CelebrationIcon from "@mui/icons-material/Celebration";

export const GROUP_TO_ICON = {
  "Political Parties": GroupsIcon,
  "Education & Profession": SchoolIcon,
  "Voting & Parliamentary Attandance": HowToVoteIcon,
  "Transparency & Corruption": LocalPoliceIcon,
  Demographics: FamilyRestroomIcon,
  "Electoral Regions": LocationOnIcon,

  "Religion & Ethnicity": TempleBuddhistIcon,
  "Miscellaneous & Fun": CelebrationIcon,
};

export const GROUP_TO_DIMENSION_TO_FUNC = {
  "Political Parties": {
    Party: (mp) => mp.party,
  },
  "Education & Profession": {
    "Highest Education Level": (mp) => mp.academicHighestLevel,
    "Has Bachelors or higher?": (mp) => mp.isBachelorsOrHigher,
    "Has Advanced Levels or higher?": (mp) => mp.isALevelsOrHigher,
    Profession: (mp) => mp.profession,
  },
  "Voting & Parliamentary Attandance": {
    "Voting for 20th Amendment": (mp) => mp.vote20A,
    "Attandance 9th Parliament (2020 - )": (mp) => mp.attendance9th,
    "Attandance 8th Parliament (2017 - 2020)": (mp) => mp.attendance8th,
  },
  "Transparency & Corruption": {
    "Has Publicly Declared Assets?": (mp) => mp.hasDeclaredAssets,
  },
  Demographics: {
    "Age Group (5 year)": (mp) => mp.getAgeGroup(5),
    "Age Group (10 year)": (mp) => mp.getAgeGroup(10),
    "Is Age > 40": (mp) => mp.isAgeOver(40),
    "Is Age > 50": (mp) => mp.isAgeOver(50),
    Generation: (mp) => mp.generation,
    Gender: (mp) => mp.gender,
    "Civil Status": (mp) => mp.civilStatus,
  },
  "Electoral Regions": {
    "Is National List?": (mp) => mp.isNationalList,
    "Electoral District": (mp) => mp.edName,
    Province: (mp) => mp.provinceName,
  },
  "Religion & Ethnicity": {
    Religion: (mp) => mp.religion,
    "Is Sinhala Buddhist?": (mp) => mp.isSinhalaBuddhist,
  },
  "Miscellaneous & Fun": {
    "Last Name": (mp) => mp.lastName,
    "First Letter of First Name": (mp) => mp.firstNames.substring(0, 1),
    "Month of Birth": (mp) => mp.monthOfBirth,
    "Show All": (mp) => "All",
    "Show Random": (mp) => "Random Group " + parseInt(Math.random() * 5 + 1),
  },
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
export const DIMENSION_TO_FUNC = Object.values(
  GROUP_TO_DIMENSION_TO_FUNC
).reduce(function (DIMENSION_TO_FUNC, d) {
  return Object.entries(d).reduce(function (DIMENSION_TO_FUNC, [dim, func]) {
    DIMENSION_TO_FUNC[dim] = func;
    return DIMENSION_TO_FUNC;
  }, DIMENSION_TO_FUNC);
}, {});

export const GROUP_TO_DIMENSION_LIST = Object.entries(
  GROUP_TO_DIMENSION_TO_FUNC
).reduce(function (GROUP_TO_DIMENSION_LIST, [group, d]) {
  GROUP_TO_DIMENSION_LIST[group] = Object.keys(d);
  return GROUP_TO_DIMENSION_LIST;
}, {});

export const DIMENSION_LIST = Object.keys(DIMENSION_TO_FUNC);
