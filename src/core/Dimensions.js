import DataStructuresFuture from "../base/DataStructuresFuture.js";
import {
  SORTED_DIMENSION_LIST,
  DIMENSION_TO_FUNC,
} from "./DimensionConstants.js";

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
