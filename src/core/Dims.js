import DataStructuresFuture from "../base/DataStructuresFuture.js";
import { DIM_IDX } from "./DimConstants.js";

function expandDimInfo(mpList, dimName) {
  const dim = DIM_IDX[dimName];
  const xValues = dim.map(mpList);

  let xAxisLabels;
  if (dim.isSorted) {
    xAxisLabels = DataStructuresFuture.uniqueSorted(xValues);
  } else {
    const xAxisLabelAndCount = DataStructuresFuture.keyAndCount(xValues);
    xAxisLabels = xAxisLabelAndCount.map((x) => x[0]);
  }
  const xToIX = DataStructuresFuture.buildReverseIndex(xAxisLabels);

  return [xAxisLabels, xAxisLabels.length, xToIX];
}

export default class Dims {
  static buildGrid(mpList, dimXName, dimYName, cellMap) {
    const [xAxisLabels, nX, xToIX] = expandDimInfo(mpList, dimXName);
    const [yAxisLabels, nY, yToIY] = expandDimInfo(mpList, dimYName);

    const cells = mpList.reduce(
      function (cells, mp) {
        const dimX = DIM_IDX[dimXName];
        const dimY = DIM_IDX[dimYName];
        const xValue = dimX.func(mp);
        const yValue = dimY.func(mp);
        const [iX, iY] = [xToIX[xValue], yToIY[yValue]];
        cells[iX][iY].push(cellMap(mp));
        return cells;
      },
      DataStructuresFuture.initArray2D(nX, nY, (iX, iY) => [])
    );

    return { cells, xAxisLabels, yAxisLabels };
  }
}
