import DataStructuresFuture from "../base/DataStructuresFuture.js";

export const DIMENSION_TO_FUNC = {
  Gender: (mp) => mp.gender,
  "Age Group (5 year)": (mp) => mp.getAgeGroup(5),
  "Age Group (10 year)": (mp) => mp.getAgeGroup(10),
  "Is Age > 40": (mp) => mp.isAgeOver(40),
  "Is Age > 50": (mp) => mp.isAgeOver(50),
  Party: (mp) => mp.party,
  "Is National List?": (mp) => mp.isNationalList,
  "Electoral District": (mp) => mp.edName,
  Province: (mp) => mp.provinceName,
  Religion: (mp) => mp.religion,
  Profession: (mp) => mp.profession,
  "Is Sinhala Buddhist?": (mp) => mp.isSinhalaBuddhist,
  "Last Name": (mp) => mp.lastName,
  "First Letter of First Name": (mp) => mp.firstNames.substring(0, 1),
  "Highest Education Level": (mp) => mp.academicHighestLevel,
  "Has Bachelors or higher?": (mp) => mp.isBachelorsOrHigher,
  "Has A. Levels or higher?": (mp) => mp.isALevelsOrHigher,
  "Vote for 20th Amendment": (mp) => mp.vote20A,
};

const SORTED_DIMENSION_LIST = [
  "Age Group (5 year)",
  "Age Group (10 year)",
  "Highest Education Level",
];
export const GROUP_TO_DIMENSION_LIST = {
  "Political Parties": ["Party"],
  Education: ["Highest Education Level", "Has Bachelors or higher?", "Has A. Levels or higher?"],
  "Voting Record": ['Vote for 20th Amendment'],
  Age: [
    "Age Group (5 year)",
    "Age Group (10 year)",
    "Is Age > 40",
    "Is Age > 50",
  ],
  "Electoral Region": ["Electoral District", "Province", "Is National List?"],
  "Religion & Ethnicity": ["Religion", "Is Sinhala Buddhist?"],
  "Miscellaneous & Fun": ["Last Name", "First Letter of First Name"],
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
