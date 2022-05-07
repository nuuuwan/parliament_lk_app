import DataStructuresFuture from "../base/DataStructuresFuture.js";

export const DIMENSION_TO_FUNC = {
  Gender: (mp) => mp.gender,
  "Age Group": (mp) => mp.getAgeGroup(10),
  "Is Age > 40": (mp) => mp.isAgeOver(40),
  Party: (mp) => mp.party,
  "Is National List?": (mp) => mp.isNationalList,
  "Electoral District": (mp) => mp.edName,
  Province: (mp) => mp.provinceName,
  Religion: (mp) => mp.religion,
  Profession: (mp) => mp.profession,
  "Is Sinhala Buddhist": (mp) => mp.isSinhalaBuddhist,
  "Last Name": (mp) => mp.lastName,
};

export const DIMENSION_LIST = Object.keys(DIMENSION_TO_FUNC);

export default class Dimensions {
  static buildGrid(dataList, xMap, yMap, cellMap) {
    const dxyList = dataList.map(function (d) {
      return {
        d,
        x: xMap(d),
        y: yMap(d),
      };
    });

    const xAxisLabelAndCount = DataStructuresFuture.keyAndCount(
      dxyList.map((dxy) => dxy.x)
    );

    const yAxisLabelAndCount = DataStructuresFuture.keyAndCount(
      dxyList.map((dxy) => dxy.y)
    );

    const xAxisLabels = xAxisLabelAndCount.map((x) => x[0]);
    const yAxisLabels = yAxisLabelAndCount.map((x) => x[0]);

    const nX = xAxisLabels.length;
    const nY = yAxisLabels.length;

    const xToIX = DataStructuresFuture.buildReverseIndex(xAxisLabels);
    const yToIY = DataStructuresFuture.buildReverseIndex(yAxisLabels);

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
