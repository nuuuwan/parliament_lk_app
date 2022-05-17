import React, { Component } from "react";
import ReactGA from "react-ga";
import Box from "@mui/material/Box";

import History from "../../base/History.js";
import MathXFuture from "../../base/MathXFuture.js";
import I18N from "../../base/I18N.js";
import MP from "../../core/MP.js";
import Dims from "../../core/Dims.js";

import MPTable from "../../nonstate/molecules/MPTable.js";
import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation.js";
import StatisticalTrendsWidget from "../../nonstate/molecules/StatisticalTrendsWidget.js";
import MPDrawer from "../../nonstate/molecules/MPDrawer.js";
import AvatarMP from "../../nonstate/atoms/AvatarMP.js";
import VersionWidget from "../../nonstate/atoms/VersionWidget.js";
import CustomAppBar from "../../nonstate/molecules/CustomAppBar.js";
import DimPanel from "../../nonstate/molecules/DimPanel.js";

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

    const url = window.location.href;

    let selectedLang;
    let activeMPIdHref;
    let xDim;
    let yDim;

    const params = decodeURI(url).split("#");
    if (params && params.length >= 5) {
      selectedLang = params[1];
      activeMPIdHref = params[2];
      xDim = params[3];
      yDim = params[4];
    }

    if (!selectedLang) {
      selectedLang = DEFAULT_LANG;
    }
    I18N.setLang(selectedLang);

    if (!xDim) {
      xDim = DEFAULT_X_DIM;
    }
    if (!yDim) {
      yDim = DEFAULT_Y_DIM;
    }

    this.state = {
      activeMPIdHref,
      selectedLang,
      xDim,
      yDim,

      activeMPId: null,
      mpIdx: undefined,
      showStatisticalTrends: false,
    };
    this.history = new History("parliament_lk_all");
  }

  setStateWrapper(newState) {
    this.setState(
      newState,
      function () {
        const {
          xDim,
          yDim,
          activeMPId,
          showStatisticalTrends,
          selectedLang,
          mpIdx,
        } = this.state;
        this.history.setState({
          xDim,
          yDim,
          activeMPId,
          showStatisticalTrends,
          selectedLang,
        });

        const mp = mpIdx[activeMPId];
        const idHref = mp ? mp.idHref : null;
        const paramStr = [selectedLang, idHref, xDim, yDim].join("#");
        window.history.pushState({}, null, "#" + encodeURI(paramStr));
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
    this.setMP(mpID, "Clicked MP");
  }

  onSelectMP(mpID) {
    this.setMP(mpID, "Searched MP");
  }

  setMP(mpID, gaAction) {
    const { mpIdx } = this.state;
    const mp = mpIdx[mpID];

    ReactGA.event({
      category: "MPs",
      action: gaAction,
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

  getRandomMP() {
    const { mpIdx } = this.state;
    return MathXFuture.randomChoice(Object.values(mpIdx));
  }

  onClickShowRandomMP() {
    const randomMP = this.getRandomMP();
    this.setMP(randomMP.id, "Showed Random MP");
  }

  async componentDidMount() {
    const mpIdx = await MP.getMPIdx();
    const mpIdxHref = await MP.getMPIdxHref();

    let { activeMPIdHref, activeMPId } = this.state;

    if (mpIdxHref[activeMPIdHref]) {
      activeMPId = mpIdxHref[activeMPIdHref].id;
    }

    this.setState({ mpIdx, mpIdxHref, activeMPId });
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
    const isDrawerOpen = activeMP !== undefined;

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

        <DimPanel
          xDim={xDim}
          yDim={yDim}
          onChangeYDim={this.onChangeYDim.bind(this)}
          onClickSwapDims={this.onClickSwapDims.bind(this)}
          onChangeXDim={this.onChangeXDim.bind(this)}
        />

        <MPTable
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

        <MPDrawer
          mp={activeMP}
          onClose={this.onDrawerClose.bind(this)}
          isDrawerOpen={isDrawerOpen}
        />

        <VersionWidget />

        <CustomBottomNavigation
          onClickUndo={this.onClickUndo.bind(this)}
          onClickStatisticalTrends={this.onClickStatisticalTrends.bind(this)}
          onClickShowRandomMP={this.onClickShowRandomMP.bind(this)}
        />
      </Box>
    );
  }
}
