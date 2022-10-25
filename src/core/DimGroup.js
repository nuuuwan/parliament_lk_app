import CelebrationIcon from "@mui/icons-material/Celebration";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import GroupsIcon from "@mui/icons-material/Groups";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import SchoolIcon from "@mui/icons-material/School";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";

import { DataStructures } from "@nuuuwan/utils-js-dev";

export default class DimGroup {
  constructor(name, Icon) {
    this.name = name;
    this.Icon = Icon;
  }
}

// Constants

export const DIM_GROUP_LIST = [
  new DimGroup("Political Parties & Electoral Regions", GroupsIcon),
  new DimGroup("Voting & Parliamentary Participation", HowToVoteIcon),
  new DimGroup("Transparency & Corruption", LocalPoliceIcon),
  new DimGroup("Education & Profession", SchoolIcon),
  new DimGroup("Demographics", FamilyRestroomIcon),
  new DimGroup("Religion & Ethnicity", TempleBuddhistIcon),
  new DimGroup("Miscellaneous & Fun", CelebrationIcon),
];

export const DIM_GROUP_IDX = DataStructures.buildIndex(
  DIM_GROUP_LIST,
  (dimGroup) => dimGroup.name
);
