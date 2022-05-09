import React, { Component } from "react";
import ReactGA from "react-ga";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import SourceIcon from "@mui/icons-material/Source";
import GitHubIcon from "@mui/icons-material/GitHub";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import MP from "../../core/MP.js";
import GridView from "../../nonstate/molecules/GridView.js";
import MPDrawerView from "../../nonstate/molecules/MPDrawerView.js";
import DimensionPicker from "../../nonstate/atoms/DimensionPicker.js";

import Dimensions from "../../core/Dimensions.js";

const DEFAULT_X_DIM = "Is Age > 40";
const DEFAULT_Y_DIM = "Gender";

const COLOR_SWITCH_ON = "#1976D2";
const STYLE = {
  margin: 4,
  marginBottom: 10,
};
const AVATAR_SIZE = 48;

const STATISTICAL_TRENDS_TOOLTOP = [
  "Statistical Trends measure if certain grid cells contain more MPs than",
  " we would expect if they were assigned at random. ",
  " The 'z' (e.g. z = 2.5) value shows how many standard deviations",
  " the number of MPs vary from the mean number of expected MPs.",
  " The range (e.g. 84 - 114) is the 95% confidence interval for the",
  " number of MPs. If the actual number is outside this range,",
  " the probability that the trend is random is <5%.",
].join("");

const BOTTOM_NAVIGATION_ITEMS = [
  {
    name: "@ParliamentLK",
    url:
      "https://www.parliament.lk/" +
      "en/members-of-parliament/directory-of-members/",
    details: "All data except asset declaration data is from www.parliament.lk",
    Icon: SourceIcon,
  },
  {
    name: "@TISriLanka",
    url: "https://www.tisrilanka.org/mpassets/",
    details: "Asset declaration data is from www.tisrilanka.org",
    Icon: SourceIcon,
  },
  {
    name: "@nuuuwan",
    url: "http://github.com/nuuuwan",
    details: "Visualization, Design and App by @nuuuwan",
    Icon: GitHubIcon,
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
    ReactGA.event({
      category: "Dimensions",
      action: "Selected X Dimension",
      label: "xDim",
    });
    this.setState({ xDim });
  }

  onChangeYDim(yDim) {
    ReactGA.event({
      category: "Dimensions",
      action: "Selected Y Dimension",
      label: "yDim",
    });
    this.setState({ yDim });
  }

  onClickMP(mpID) {
    ReactGA.event({
      category: "MPs",
      action: "Clicked MP",
      label: mpID,
    });
    this.setState({ activeMPId: mpID });
  }

  onDrawerClose() {
    this.setState({ activeMPId: null });
  }

  onShowStatisticalTrendsClick() {
    const oldState = this.state.showStatisticalTrends;
    ReactGA.event({
      category: "Statistical Trends",
      action: "Clicked Statistical Trends Checkbox",
      label: oldState.toString(),
    });

    this.setState({ showStatisticalTrends: !oldState });
  }

  onClickSwapDims(e) {
    const { xDim, yDim } = this.state;
    ReactGA.event({
      category: "Dimensions",
      action: "Swapped Dimensions",
      label: `${xDim},${yDim}`,
    });
    this.setState({
      xDim: yDim,
      yDim: xDim,
    });
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
        <div key={key}>
          <Tooltip
            title={
              <>
                <Typography variant="subtitle1">{i18n.t(mp.name)}</Typography>
                <Typography variant="overline" display="block">
                  {i18n.t(mp.party)}
                  {" - "}
                  {i18n.t(mp.edName)}
                </Typography>
              </>
            }
          >
            <Avatar
              alt={mp.name}
              src={mp.imageURL}
              onClick={onClickInner}
              sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            />
          </Tooltip>
        </div>
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
        <Stack direction="row">
          <DimensionPicker
            label={i18n.t("Top to Bottom") + " (Y)"}
            selectedDimension={yDim}
            onChange={this.onChangeYDim.bind(this)}
            i18n={i18n}
          />

          <IconButton onClick={this.onClickSwapDims.bind(this)}>
            <SwapHorizIcon />
          </IconButton>
          <DimensionPicker
            label={i18n.t("Left to Right") + " (X)"}
            selectedDimension={xDim}
            onChange={this.onChangeXDim.bind(this)}
            i18n={i18n}
          />

          <FormControlLabel
            control={
              <Switch
                checked={showStatisticalTrends}
                onClick={this.onShowStatisticalTrendsClick.bind(this)}
              />
            }
            label={
              <Typography
                variant="subtitle2"
                color={showStatisticalTrends ? COLOR_SWITCH_ON : "gray"}
              >
                {i18n.t("Statistical Trends")}
              </Typography>
            }
          />
        </Stack>

        {showStatisticalTrends ? (
          <Stack sx={{ maxWidth: 700 }} margin={2}>
            <Alert severity="info">
              <AlertTitle>{i18n.t("Statistical Trends")}</AlertTitle>
              {i18n.t(STATISTICAL_TRENDS_TOOLTOP)}
            </Alert>
          </Stack>
        ) : null}

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
          <MPDrawerView mp={activeMP} i18n={i18n} />
        </Drawer>

        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            {BOTTOM_NAVIGATION_ITEMS.map(function (d, i) {
              const key = "data-" + i;
              const onClick = function (e) {
                window.open(d.url, "_blank");
              };
              const Icon = d.Icon;
              return (
                <Tooltip
                  key={key}
                  title={
                    <Typography variant="subtitle1">
                      {i18n.t(d.details)}
                    </Typography>
                  }
                >
                  <BottomNavigationAction
                    label={d.name}
                    icon={<Icon />}
                    onClick={onClick}
                  />
                </Tooltip>
              );
            })}
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }
}
