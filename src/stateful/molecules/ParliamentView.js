import DataStructuresFuture from "../../base/DataStructuresFuture.js";
import { Component } from "react";
import MP from "../../core/MP.js";
import MPWidget from "../../nonstate/molecules/MPWidget.js";
import GridView from "../../nonstate/molecules/GridView.js";

function buildGrid(dataList, xMap, yMap, cellMap) {
  const dxyList = dataList.map(function (d) {
    return {
      d,
      x: xMap(d),
      y: yMap(d),
    };
  });

  const xAxisLabels = DataStructuresFuture.unique(
    dxyList.map((dxy) => dxy.x)
  ).sort();
  const yAxisLabels = DataStructuresFuture.unique(
    dxyList.map((dxy) => dxy.y)
  ).sort();

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

export default class ParliamentView extends Component {
  constructor(props) {
    super(props);
    this.state = { mpList: undefined };
  }

  async componentDidMount() {
    const mpList = await MP.getMPList();
    this.setState({ mpList });
  }

  render() {
    const { mpList } = this.state;
    if (mpList === undefined) {
      return "Loading...";
    }

    const { cells, xAxisLabels, yAxisLabels } = buildGrid(
      mpList,
      (mp) => mp.party,
      (mp) => mp.getAgeGroup(10),
      (mp) => <MPWidget mp={mp} />
    );

    return (
      <GridView
        cells={cells}
        xAxisLabels={xAxisLabels}
        yAxisLabels={yAxisLabels}
      />
    );
  }
}
