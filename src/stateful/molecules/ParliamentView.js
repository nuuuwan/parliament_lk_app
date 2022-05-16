import React, { Component } from "react";
import ReactGA from "react-ga";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import History from "../../base/History.js";
import I18N from "../../base/I18N.js";
import MP from "../../core/MP.js";
import Dims from "../../core/Dims.js";

import GridView from "../../nonstate/molecules/GridView.js";
import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation.js";
import StatisticalTrendsWidget from "../../nonstate/molecules/StatisticalTrendsWidget.js";
import MPDrawer from "../../nonstate/molecules/MPDrawer.js";
import AvatarMP from "../../nonstate/atoms/AvatarMP.js";
import DimPicker from "../../nonstate/atoms/DimPicker.js";
import VersionWidget from "../../nonstate/atoms/VersionWidget.js";
import CustomAppBar from "../../nonstate/molecules/CustomAppBar.js";

const DEFAULT_X_DIM = "Is Age > 40";
const DEFAULT_Y_DIM = "Gender";
const DEFAULT_LANG = "en";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

export default class ParliamentView extends Component {
  constructor(props) {
    super(props);
    let selectedLang = I18N.getLang();
    if (!selectedLang) {
      selectedLang = DEFAULT_LANG;
    }
    this.state = {
      mpIdx: undefined,

      xDim: DEFAULT_X_DIM,
      yDim: DEFAULT_Y_DIM,
      activeMPId: null,
      showStatisticalTrends: false,
      selectedLang: selectedLang,
    };
    this.history = new History("parliament_lk_all");
  }

  setStateWrapper(newState) {
    this.setState(
      newState,
      function () {
        const { xDim, yDim, activeMPId, showStatisticalTrends, selectedLang } =
          this.state;
        this.history.setState({
          xDim,
          yDim,
          activeMPId,
          showStatisticalTrends,
          selectedLang,
        });
      }.bind(this)
    );
  }

  onSelectLang(selectedLang) {
    this.setStateWrapper({ selectedLang });
  }

  onChangeXDim(xDim) {
    ReactGA.event({
      category: "Dims",
      action: `Changed X Dim`,
      label: xDim,
      value: 10,
    });

    this.setStateWrapper({ xDim });
  }

  onChangeYDim(yDim) {
    ReactGA.event({
      category: "Dims",
      action: `Changed Y Dim`,
      label: yDim,
      value: 10,
    });

    this.setStateWrapper({ yDim });
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
    this.setStateWrapper({ activeMPId: mpID });
  }

  onSelectMP(mpID) {
    const { mpIdx } = this.state;
    const mp = mpIdx[mpID];
    ReactGA.event({
      category: "MPs",
      action: "Searched MP",
      label: mp.logString,
      value: 10,
    });
    this.setStateWrapper({ activeMPId: mpID });
  }

  onDrawerClose() {
    this.setState({ activeMPId: null });
  }

  onClickStatisticalTrends() {
    const oldShowStatisticalTrends = this.state.showStatisticalTrends;
    ReactGA.event({
      category: "Statistical Trends",
      action: "Clicked Statistical Trends",
      label: oldShowStatisticalTrends.toString(),
      value: 10,
    });

    if (!oldShowStatisticalTrends) {
      this.setStateWrapper({ showStatisticalTrends: true });
    } else {
      this.setState({ showStatisticalTrends: false });
    }
  }

  onClickSwapDims(e) {
    const { xDim, yDim } = this.state;
    ReactGA.event({
      category: "Dims",
      action: "Clicked Swap Dims",
      label: `${xDim},${yDim}`,
      value: 10,
    });
    this.setStateWrapper({
      xDim: yDim,
      yDim: xDim,
    });
  }

  onClickUndo() {
    const newState = this.history.gotoPrev();
    if (newState) {
      this.setState(newState);
    }
  }

  async componentDidMount() {
    const mpIdx = await MP.getMPIdx();
    this.setState({ mpIdx });
  }

  render() {
    const {
      mpIdx,
      xDim,
      yDim,
      activeMPId,
      showStatisticalTrends,
      selectedLang,
    } = this.state;
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

    ReactGA.event({
      category: "Dims",
      action: `ParliamentView.render()`,
      label: `${xDim},${yDim}`,
      value: 10,
    });

    const cellMap = function (mp) {
      const key = `avatar-${mp.id}`;
      const isActiveMP = mp.id === activeMPId;
      return (
        <AvatarMP
          key={key}
          mp={mp}
          onClickMP={this.onClickMP.bind(this)}
          isActiveMP={isActiveMP}
        />
      );
    }.bind(this);

    const { cells, xAxisLabels, yAxisLabels } = Dims.buildGrid(
      Object.values(mpIdx),
      xDim,
      yDim,
      cellMap
    );

    return (
      <Box sx={STYLE}>
        <CustomAppBar
          mpIdx={mpIdx}
          activeMPId={activeMPId}
          selectedLang={selectedLang}
          onSelectMP={this.onSelectMP.bind(this)}
          onSelectLang={this.onSelectLang.bind(this)}
        />

        <Grid container justifyContent="center">
          <DimPicker
            selectedDim={yDim}
            onChange={this.onChangeYDim.bind(this)}
          />

          <IconButton onClick={this.onClickSwapDims.bind(this)}>
            <SwapHorizIcon />
          </IconButton>
          <DimPicker
            selectedDim={xDim}
            onChange={this.onChangeXDim.bind(this)}
          />
        </Grid>

        <GridView
          cells={cells}
          xAxisLabels={xAxisLabels}
          yAxisLabels={yAxisLabels}
          onClick={this.onClickMP}
          showStatisticalTrends={showStatisticalTrends}
        />

        <StatisticalTrendsWidget
          showStatisticalTrends={showStatisticalTrends}
          onClickStatisticalTrends={this.onClickStatisticalTrends.bind(this)}
        />

        <Drawer
          anchor="right"
          open={activeMPId !== null}
          onClose={this.onDrawerClose.bind(this)}
          PaperProps={{
            sx: { maxHeight: "90%", maxWidth: "90%" },
          }}
        >
          <MPDrawer mp={activeMP} onClose={this.onDrawerClose.bind(this)} />
        </Drawer>
        <VersionWidget />
        <CustomBottomNavigation
          onClickUndo={this.onClickUndo.bind(this)}
          onClickStatisticalTrends={this.onClickStatisticalTrends.bind(this)}
        />
      </Box>
    );
  }
}
