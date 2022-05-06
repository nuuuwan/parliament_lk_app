import DataStructuresFuture from "../../base/DataStructuresFuture.js";
import { Component } from "react";
import MP from "../../core/MP.js";
import MPWidget from "../../nonstate/molecules/MPWidget.js";
import GridView from "../../nonstate/molecules/GridView.js";
import DimensionPicker from "../../nonstate/atoms/DimensionPicker.js";

const DEFAULT_X_DIM = "Party";
const DEFAULT_Y_DIM = "Age Group";

const DIM_TO_FUNC = {
  "Age Group": (mp) => mp.getAgeGroup(10),
  Party: (mp) => mp.party,
  "Is National List": (mp) => mp.isNationalList,
  "Electoral District": (mp) => mp.electoralDistrict,
  Religion: (mp) => mp.religion,
  Profession: (mp) => mp.profession,
  "Is Sinhala Buddhist": (mp) => mp.isSinhalaBuddhist,
};

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
    this.state = {
      mpList: undefined,
      xDim: DEFAULT_X_DIM,
      yDim: DEFAULT_Y_DIM,
    };
  }

  onChangeXDim(xDim) {
    this.setState({ xDim });
  }

  onChangeYDim(yDim) {
    this.setState({ yDim });
  }

  async componentDidMount() {
    const mpList = await MP.getMPList();
    this.setState({ mpList });
  }

  render() {
    const { mpList, xDim, yDim } = this.state;
    if (mpList === undefined) {
      return <div>Loading...</div>;
    }

    const { cells, xAxisLabels, yAxisLabels } = buildGrid(
      mpList,
      DIM_TO_FUNC[xDim],
      DIM_TO_FUNC[yDim],
      (mp) => <MPWidget key={`mp-${mp.id}`} mp={mp} />
    );

    return (
      <div>
        <DimensionPicker
          selectedDimension={xDim}
          onChange={this.onChangeXDim.bind(this)}
        />
        {" x "}
        <DimensionPicker
          selectedDimension={yDim}
          onChange={this.onChangeYDim.bind(this)}
        />
        <GridView
          cells={cells}
          xAxisLabels={xAxisLabels}
          yAxisLabels={yAxisLabels}
        />
      </div>
    );
  }
}
