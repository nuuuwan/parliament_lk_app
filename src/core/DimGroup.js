import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import CelebrationIcon from "@mui/icons-material/Celebration";

import DataStructuresFuture from "../base/DataStructuresFuture.js";

export default class DimGroup {
  constructor(name, Icon) {
    this.name = name;
    this.Icon = Icon;
  }
}

// Constants

export const DIM_GROUP_LIST = [
  new DimGroup("Political Parties & Electoral Regions", GroupsIcon),
  new DimGroup("Voting & Parliamentary Attandance", HowToVoteIcon),
  new DimGroup("Transparency & Corruption", LocalPoliceIcon),
  new DimGroup("Education & Profession", SchoolIcon),
  new DimGroup("Demographics", FamilyRestroomIcon),
  new DimGroup("Religion & Ethnicity", TempleBuddhistIcon),
  new DimGroup("Miscellaneous & Fun", CelebrationIcon),
];

export const DIM_GROUP_IDX = DataStructuresFuture.buildIndex(
  DIM_GROUP_LIST,
  (dimGroup) => dimGroup.name
);
