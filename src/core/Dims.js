import { DataStructures } from "@nuuuwan/utils-js-dev";

import { DIM_IDX } from "./Dim.js";
import MP from "../core/MP.js";

function expandDimInfo(mpList, dimName) {
  const dim = DIM_IDX[dimName];
  const xValues = dim.map(mpList);

  let xAxisLabels;
  if (dim.isSorted) {
    xAxisLabels = DataStructures.uniqueSorted(xValues);
  } else {
    const xAxisLabelAndCount = DataStructures.keyAndCount(xValues);
    xAxisLabels = xAxisLabelAndCount.map((x) => x[0]);
  }
  const xToIX = DataStructures.buildReverseIndex(xAxisLabels);

  return [xAxisLabels, xAxisLabels.length, xToIX];
}

export default class Dims {
  static buildGrid(mpList, dimXName, dimYName, cellMap) {
    const [xAxisLabels, nX, xToIX] = expandDimInfo(mpList, dimXName);
    const [yAxisLabels, nY, yToIY] = expandDimInfo(mpList, dimYName);

    const mpCells = mpList.reduce(
      function (cells, mp) {
        const dimX = DIM_IDX[dimXName];
        const dimY = DIM_IDX[dimYName];
        const xValue = dimX.func(mp);
        const yValue = dimY.func(mp);
        const [iX, iY] = [xToIX[xValue], yToIY[yValue]];
        cells[iX][iY].push(mp);
        return cells;
      },
      DataStructures.initArray2D(nX, nY, (iX, iY) => [])
    );

    const cells = mpCells.map(function (mpCellsX, iX) {
      return mpCellsX.map(function (mpList, iY) {
        return mpList.sort(MP.cmpParty).map(cellMap);
      });
    });

    return { cells, xAxisLabels, yAxisLabels };
  }
}
