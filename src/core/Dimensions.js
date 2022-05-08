import DataStructuresFuture from "../base/DataStructuresFuture.js";

export const DIMENSION_TO_FUNC = {
  // Political Parties
  Party: (mp) => mp.party,

  // Education & Profession
  "Highest Education Level": (mp) => mp.academicHighestLevel,
  "Has Bachelors or higher?": (mp) => mp.isBachelorsOrHigher,
  "Has Advanced Levels or higher?": (mp) => mp.isALevelsOrHigher,
  Profession: (mp) => mp.profession,

  // Voting Record
  "Voting for 20th Amendment": (mp) => mp.vote20A,

  // Transparency & Corruption
  "Has Publicly Declared Assets?": (mp) => mp.hasDeclaredAssets,

  // Demographics
  "Age Group (5 year)": (mp) => mp.getAgeGroup(5),
  "Age Group (10 year)": (mp) => mp.getAgeGroup(10),
  "Is Age > 40": (mp) => mp.isAgeOver(40),
  "Is Age > 50": (mp) => mp.isAgeOver(50),
  Gender: (mp) => mp.gender,

  // Electoral Regions
  "Is National List?": (mp) => mp.isNationalList,
  "Electoral District": (mp) => mp.edName,
  Province: (mp) => mp.provinceName,

  // Religion & Ethnicity
  Religion: (mp) => mp.religion,
  "Is Sinhala Buddhist?": (mp) => mp.isSinhalaBuddhist,

  // Miscellaneous & Fun
  "Last Name": (mp) => mp.lastName,
  "First Letter of First Name": (mp) => mp.firstNames.substring(0, 1),
  "Month of Birth": (mp) => mp.monthOfBirth,
};

const SORTED_DIMENSION_LIST = [
  "Age Group (5 year)",
  "Age Group (10 year)",
  "Highest Education Level",
];
export const GROUP_TO_DIMENSION_LIST = {
  "Political Parties": ["Party"],
  "Education & Profession": [
    "Highest Education Level",
    "Has Bachelors or higher?",
    "Has Advanced Levels or higher?",
  ],
  "Voting Record": ["Voting for 20th Amendment"],
  "Transparency & Corruption": ["Has Publicly Declared Assets?"],
  Demographics: [
    "Age Group (5 year)",
    "Age Group (10 year)",
    "Is Age > 40",
    "Is Age > 50",
    "Gender",
  ],
  "Electoral Regions": ["Electoral District", "Province", "Is National List?"],
  "Religion & Ethnicity": ["Religion", "Is Sinhala Buddhist?"],
  "Miscellaneous & Fun": [
    "Last Name",
    "First Letter of First Name",
    "Month of Birth",
  ],
};

export const DIMENSION_LIST = Object.keys(DIMENSION_TO_FUNC);

function expandDimensionInfo(dataList, funcXValues, xDim) {
  const xValues = dataList.map(funcXValues);

  let xAxisLabels;
  if (SORTED_DIMENSION_LIST.includes(xDim)) {
    xAxisLabels = DataStructuresFuture.uniqueSorted(xValues);
  } else {
    const xAxisLabelAndCount = DataStructuresFuture.keyAndCount(xValues);
    xAxisLabels = xAxisLabelAndCount.map((x) => x[0]);
  }
  const xToIX = DataStructuresFuture.buildReverseIndex(xAxisLabels);

  return [xAxisLabels, xAxisLabels.length, xToIX];
}

export default class Dimensions {
  static buildGrid(dataList, xDim, yDim, cellMap) {
    const xFunc = DIMENSION_TO_FUNC[xDim];
    const yFunc = DIMENSION_TO_FUNC[yDim];

    const dxyList = dataList.map(function (d) {
      return {
        d,
        x: xFunc(d),
        y: yFunc(d),
      };
    });

    const [xAxisLabels, nX, xToIX] = expandDimensionInfo(
      dxyList,
      (d) => d.x,
      xDim
    );
    const [yAxisLabels, nY, yToIY] = expandDimensionInfo(
      dxyList,
      (d) => d.y,
      yDim
    );

    const cells = dxyList.reduce(
      function (cells, dxy) {
        const [iX, iY] = [xToIX[dxy.x], yToIY[dxy.y]];
        cells[iX][iY].push(cellMap(dxy.d));
        return cells;
      },
      DataStructuresFuture.initArray2D(nX, nY, (iX, iY) => [])
    );

    return { cells, xAxisLabels, yAxisLabels };
  }
}
