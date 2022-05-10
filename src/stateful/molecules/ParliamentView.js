import React, { Component } from "react";
import ReactGA from "react-ga";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import MP from "../../core/MP.js";
import GridView from "../../nonstate/molecules/GridView.js";
import CustomBottomNavigation from
  "../../nonstate/molecules/CustomBottomNavigation.js";

import MPDrawerView from "../../nonstate/molecules/MPDrawerView.js";
import AvatarMP from "../../nonstate/atoms/AvatarMP.js";
import DimensionPicker from "../../nonstate/atoms/DimensionPicker.js";

import {t} from "../../base/I18N.js";
import Dimensions from "../../core/Dimensions.js";

const DEFAULT_X_DIM = "Is Age > 40";
const DEFAULT_Y_DIM = "Gender";

const COLOR_SWITCH_ON = "#1976D2";
const STYLE = {
  margin: 4,
  marginBottom: 10,
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
      action: `Changed X Dim`,
      label: xDim,
      value: 10,
    });

    this.setState({ xDim });
  }

  onChangeYDim(yDim) {
    ReactGA.event({
      category: "Dimensions",
      action: `Changed Y Dim`,
      label: yDim,
      value: 10,
    });

    this.setState({ yDim });
  }

  onClickMP(mpID) {
    const { mpIdx } = this.state;
    const mp = mpIdx[mpID];
    ReactGA.event({
      category: "MPs",
      action: "Clicked MP",
      label: mp.logString,
      value: 10,
    });
    this.setState({ activeMPId: mpID });
  }

  onDrawerClose() {
    this.setState({ activeMPId: null });
  }

  onClickStatisticalTrends() {
    const oldState = this.state.showStatisticalTrends;
    ReactGA.event({
      category: "Statistical Trends",
      action: "Clicked Statistical Trends",
      label: oldState.toString(),
      value: 10,
    });

    this.setState({ showStatisticalTrends: !oldState });
  }

  onClickSwapDims(e) {
    const { xDim, yDim } = this.state;
    ReactGA.event({
      category: "Dimensions",
      action: "Clicked Swap Dimensions",
      label: `${xDim},${yDim}`,
      value: 10,
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
    const activeMP = mpIdx[activeMPId];

    let activeMPStr = "None";
    if (activeMP) {
      activeMPStr = activeMP.logString;
    }

    ReactGA.event({
      category: "ParliamentView State",
      action: "ParliamentView.render()",
      label: `${xDim},${yDim},${activeMPStr}`,
      value: 0,
    });

    const cellMap = function (mp) {
      const key = `avatar-${mp.id}`;
      return (
        <AvatarMP key={key} mp={mp}  onClickMP={this.onClickMP.bind(this)} />
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
            label={t("Top to Bottom") + " (Y)"}
            selectedDimension={yDim}
            onChange={this.onChangeYDim.bind(this)}

          />

          <IconButton onClick={this.onClickSwapDims.bind(this)}>
            <SwapHorizIcon />
          </IconButton>
          <DimensionPicker
            label={t("Left to Right") + " (X)"}
            selectedDimension={xDim}
            onChange={this.onChangeXDim.bind(this)}

          />

        </Stack>

        <FormControlLabel
          control={
            <Switch
              checked={showStatisticalTrends}
              onClick={this.onClickStatisticalTrends.bind(this)}
            />
          }
          label={
            <Typography
              variant="subtitle2"
              color={showStatisticalTrends ? COLOR_SWITCH_ON : "gray"}
            >
              {t("Statistical Trends")}
            </Typography>
          }
          sx={{marginLeft: 1}}
        />

        {showStatisticalTrends ? (
          <Stack sx={{ maxWidth: 700 }} margin={2}>
            <Alert severity="info">
              <AlertTitle>{t("Statistical Trends")}</AlertTitle>
              {t(STATISTICAL_TRENDS_TOOLTOP)}
            </Alert>
          </Stack>
        ) : null}

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
          <MPDrawerView
            mp={activeMP}

            onClose={this.onDrawerClose.bind(this)}
          />
        </Drawer>

        <CustomBottomNavigation />
      </Box>
    );
  }
}
