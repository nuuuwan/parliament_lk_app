import { DIM_IDX } from "./Dim.js";

export const DIM_GROUP_NAME_TO_DIM_NAME = {
  "Political Parties & Electoral Regions": [
    "Party",
    "Is National List?",
    "Electoral District",
    "Province",
  ],
  "Education & Profession": [
    "Highest Education Level",
    "Has Bachelors or higher?",
    "Has Advanced Levels or higher?",
    "Profession",
  ],
  "Voting & Parliamentary Participation": [
    "Voting for 20th Amendment",
    "Attandance 9th Parliament (2020 - )",
    "Attandance 8th Parliament (2017 - 2020)",
    "Was in 2019 Nov Cabinet?",
    "Was in 2020 Aug Cabinet?",
    "Was in 2022 Apr Cabinet?",
    "Was in 2022 May Cabinet?",
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
