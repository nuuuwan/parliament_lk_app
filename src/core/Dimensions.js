import DataStructuresFuture from "../base/DataStructuresFuture.js";

export const DIMENSION_TO_FUNC = {
  Gender: (mp) => mp.gender,
  "Age Group": (mp) => mp.getAgeGroup(10),
  "Is Age > 40": (mp) => mp.isAgeOver(40),
  "Is Age > 50": (mp) => mp.isAgeOver(50),
  Party: (mp) => mp.party,
  "Is National List?": (mp) => mp.isNationalList,
  "Electoral District": (mp) => mp.edName,
  Province: (mp) => mp.provinceName,
  Religion: (mp) => mp.religion,
  Profession: (mp) => mp.profession,
  "Is Sinhala Buddhist": (mp) => mp.isSinhalaBuddhist,
  "Last Name": (mp) => mp.lastName,
};

const SORTED_DIMENSION_LIST = ["Age Group", "Highest Education Level"];

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
