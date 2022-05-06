import { Component } from "react";
import MP from "../../core/MP.js";
import MPWidget from "../../nonstate/molecules/MPWidget.js";
import GridView from "../../nonstate/molecules/GridView.js";
import DimensionPicker from "../../nonstate/atoms/DimensionPicker.js";

import Dimensions, { DIMENSION_TO_FUNC } from "../../core/Dimensions.js";

const DEFAULT_X_DIM = "Party";
const DEFAULT_Y_DIM = "Age Group";

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

    const { cells, xAxisLabels, yAxisLabels } = Dimensions.buildGrid(
      mpList,
      DIMENSION_TO_FUNC[xDim],
      DIMENSION_TO_FUNC[yDim],
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
