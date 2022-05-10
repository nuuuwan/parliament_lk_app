import DataStructuresFuture from "../base/DataStructuresFuture.js";
import {
  DIMENSION_IDX,
} from "./DimensionConstants.js";

function expandDimensionInfo(mpList, dimensionName) {
  const dimension = DIMENSION_IDX[dimensionName];
  const xValues = mpList.map(dimension.func);

  let xAxisLabels;
  if (dimension.isSorted) {
    xAxisLabels = DataStructuresFuture.uniqueSorted(xValues);
  } else {
    const xAxisLabelAndCount = DataStructuresFuture.keyAndCount(xValues);
    xAxisLabels = xAxisLabelAndCount.map((x) => x[0]);
  }
  const xToIX = DataStructuresFuture.buildReverseIndex(xAxisLabels);

  return [xAxisLabels, xAxisLabels.length, xToIX];
}

export default class Dimensions {
  static buildGrid(mpList, dimensionXName, dimensionYName, cellMap) {
    const [xAxisLabels, nX, xToIX] = expandDimensionInfo(
      mpList,
      dimensionXName,
    );
    const [yAxisLabels, nY, yToIY] = expandDimensionInfo(
      mpList,
      dimensionYName,
    );

    const cells = mpList.reduce(
      function (cells, mp) {
        const dimensionX = DIMENSION_IDX[dimensionXName];
        const dimensionY = DIMENSION_IDX[dimensionYName];
        const xValue = dimensionX.func(mp);
        const yValue = dimensionY.func(mp);
        const [iX, iY] = [xToIX[xValue], yToIY[yValue]];
        cells[iX][iY].push(cellMap(mp));
        return cells;
      },
      DataStructuresFuture.initArray2D(nX, nY, (iX, iY) => [])
    );

    return { cells, xAxisLabels, yAxisLabels };
  }
}
