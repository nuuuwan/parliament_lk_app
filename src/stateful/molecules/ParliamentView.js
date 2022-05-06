import { Component } from "react";

import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import MP from "../../core/MP.js";
import GridView from "../../nonstate/molecules/GridView.js";
import MPDrawerView from "../../nonstate/molecules/MPDrawerView.js";
import DimensionPicker from "../../nonstate/atoms/DimensionPicker.js";

import Dimensions, { DIMENSION_TO_FUNC } from "../../core/Dimensions.js";

const DEFAULT_X_DIM = "Religion";
const DEFAULT_Y_DIM = "Party";

export default class ParliamentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mpIdx: undefined,
      xDim: DEFAULT_X_DIM,
      yDim: DEFAULT_Y_DIM,
      activeMPId: null,
    };
  }

  onChangeXDim(xDim) {
    this.setState({ xDim });
  }

  onChangeYDim(yDim) {
    this.setState({ yDim });
  }

  onClickMP(mpID) {
    this.setState({ activeMPId: mpID });
  }

  onDrawerClose() {
    this.setState({ activeMPId: null });
  }

  async componentDidMount() {
    const mpIdx = await MP.getMPIdx();
    this.setState({ mpIdx });
  }

  render() {
    const { mpIdx, xDim, yDim, activeMPId } = this.state;
    if (mpIdx === undefined) {
      return <div>Loading...</div>;
    }

    const activeMP = mpIdx[activeMPId];

    const cellMap = function (mp) {
      const onClickInner = function (e) {
        this.onClickMP(mp.id);
      }.bind(this);
      return <Avatar alt={mp.name} src={mp.imageURL} onClick={onClickInner} />;
    }.bind(this);

    const { cells, xAxisLabels, yAxisLabels } = Dimensions.buildGrid(
      Object.values(mpIdx),
      DIMENSION_TO_FUNC[xDim],
      DIMENSION_TO_FUNC[yDim],
      cellMap
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
          onClick={this.onClickMP}
        />
        <Drawer
          anchor="right"
          open={activeMPId !== null}
          onClose={this.onDrawerClose.bind(this)}
        >
          <MPDrawerView mp={activeMP} />
        </Drawer>
      </div>
    );
  }
}
