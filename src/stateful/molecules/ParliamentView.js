import { Component } from "react";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";

import MP from "../../core/MP.js";
import GridView from "../../nonstate/molecules/GridView.js";
import MPDrawerView from "../../nonstate/molecules/MPDrawerView.js";
import DimensionPicker from "../../nonstate/atoms/DimensionPicker.js";

import Dimensions from "../../core/Dimensions.js";

const DEFAULT_X_DIM = "Is Age > 40";
const DEFAULT_Y_DIM = "Gender";

const URL_NUUUWAN = "http://github.com/nuuuwan";
const STYLE = {
  margin: 2,
};

const STATISTICAL_TRENDS_TOOLTOP = [
  "Statistical Trends measure if certain grid cells contain more MPs than",
  " we would expect if they were assigned at random. ",
  " The 'z' (e.g. z = 2.5) value shows how many standard deviations",
  " the number of MPs vary from the mean number of expected MPs.",
  " The range (e.g. 84 - 114) is the 95% confidence interval for the",
  " number of MPs. If the actual number is outside this range,",
  " the probability that the trend is random is <5%.",
].join("");

const DATA_SOURCES = [
  {
    name: "@ParliamentLK",
    url:
      "https://www.parliament.lk/" +
      "en/members-of-parliament/directory-of-members/",
  },
  {
    name: "@TISriLanka",
    url: "https://www.tisrilanka.org/mpassets/",
  },
];

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

    this.setState({ showStatisticalTrends: !oldState });
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
    const { i18n } = this.props;

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
          label={i18n.t("Top to Bottom") + " (Y)"}
          selectedDimension={yDim}
          onChange={this.onChangeYDim.bind(this)}
          i18n={i18n}
        />
        <DimensionPicker
          label={i18n.t("Left to Right") + " (X)"}
          selectedDimension={xDim}
          onChange={this.onChangeXDim.bind(this)}
          i18n={i18n}
        />

        <Checkbox
          checked={showStatisticalTrends}
          onClick={this.onShowStatisticalTrendsClick.bind(this)}
        />
        <Tooltip title={i18n.t(STATISTICAL_TRENDS_TOOLTOP)}>
          <Typography variant="caption">
            {i18n.t("Show Statistical Trends")}
          </Typography>
        </Tooltip>

        <GridView
          cells={cells}
          xAxisLabels={xAxisLabels}
          yAxisLabels={yAxisLabels}
          onClick={this.onClickMP}
          showStatisticalTrends={showStatisticalTrends}
          i18n={i18n}
        />
        <Drawer
          anchor="right"
          open={activeMPId !== null}
          onClose={this.onDrawerClose.bind(this)}
        >
          <MPDrawerView mp={activeMP} />
        </Drawer>

        <div style={{ textAlign: "center" }}>
          <Typography variant="subtitle1">
            {i18n.t("Data from")}

            {DATA_SOURCES.map(function (d, i) {
              const key = "data-" + i;
              return (
                <Link
                  key={key}
                  href={d.url}
                  variant="subtitle1"
                  underline="none"
                  target="_blank"
                >
                  {" " + d.name}
                </Link>
              );
            })}
          </Typography>
          <Typography variant="subtitle1">
            {i18n.t("App & Visualization by")}
            <Link
              href={URL_NUUUWAN}
              variant="subtitle1"
              underline="none"
              target="_blank"
            >
              {" @nuuuwan"}
            </Link>
          </Typography>
        </div>
      </Box>
    );
  }
}
