import { Component } from "react";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Checkbox from '@mui/material/Checkbox';
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import MP from "../../core/MP.js";
import GridView from "../../nonstate/molecules/GridView.js";
import MPDrawerView from "../../nonstate/molecules/MPDrawerView.js";
import DimensionPicker from "../../nonstate/atoms/DimensionPicker.js";

import Dimensions from "../../core/Dimensions.js";

const DEFAULT_X_DIM = "Is Age > 40";
const DEFAULT_Y_DIM = "Gender";

const STYLE = {
  margin: 2,
};

const STATISTICAL_TRENDS_TOOLTOP = [
  'Statistical Trends measure if certain grid cells contain more MPs than',
  ' we would expect if they were assigned at random. ',
  ' The "z" (e.g. x = 2.5) value shows how many standard deviations',
  ' the number of MPs vary from the mean number of expected MPs.',
  ' The range (e.g. Exp. 84 to 114) is the 95% confidence interval for the',
  ' number of MPs. If the actual number is outside this range,',
  ' the probability that the trend is random is <5%.',
].join('')

export default class ParliamentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mpIdx: undefined,
      xDim: DEFAULT_X_DIM,
      yDim: DEFAULT_Y_DIM,
      activeMPId: null,
      showStatisticalTrends: false,
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

  onShowStatisticalTrendsClick() {
    const oldState = this.state.showStatisticalTrends;

    this.setState({showStatisticalTrends: !oldState});
  }

  async componentDidMount() {
    const mpIdx = await MP.getMPIdx();
    this.setState({ mpIdx });
  }

  render() {
    const { mpIdx, xDim, yDim, activeMPId, showStatisticalTrends } = this.state;
    if (mpIdx === undefined) {
      return <div>Loading...</div>;
    }

    const activeMP = mpIdx[activeMPId];

    const cellMap = function (mp) {
      const onClickInner = function (e) {
        this.onClickMP(mp.id);
      }.bind(this);
      const key = `avatar-${mp.id}`;
      return (
        <Avatar
          key={key}
          alt={mp.name}
          src={mp.imageURL}
          onClick={onClickInner}
        />
      );
    }.bind(this);

    const { cells, xAxisLabels, yAxisLabels } = Dimensions.buildGrid(
      Object.values(mpIdx),
      xDim,
      yDim,
      cellMap
    );

    return (
      <Box sx={STYLE}>
        <DimensionPicker
          label="Top to Bottom (Y)"
          selectedDimension={yDim}
          onChange={this.onChangeYDim.bind(this)}
        />
        <DimensionPicker
          label="Left to Right (X)"
          selectedDimension={xDim}
          onChange={this.onChangeXDim.bind(this)}
        />


        <Checkbox checked={showStatisticalTrends} onClick={this.onShowStatisticalTrendsClick.bind(this)}/>
        <Tooltip title={STATISTICAL_TRENDS_TOOLTOP}>
          <Typography variant="caption">
            Show Statistical Trends
          </Typography>
        </Tooltip>


        <GridView
          cells={cells}
          xAxisLabels={xAxisLabels}
          yAxisLabels={yAxisLabels}
          onClick={this.onClickMP}
          showStatisticalTrends={showStatisticalTrends}
        />
        <Drawer
          anchor="right"
          open={activeMPId !== null}
          onClose={this.onDrawerClose.bind(this)}
        >
          <MPDrawerView mp={activeMP} />
        </Drawer>
      </Box>
    );
  }
}
