import React, { Component } from "react";
import ReactGA from "react-ga";

import { MathX } from "@nuuuwan/utils-js-dev";

import Dims from "../../core/Dims.js";
import MP from "../../core/MP.js";

import AvatarMP from "../../nonstate/atoms/AvatarMP.js";
import ParliamentView from "../../nonstate/molecules/ParliamentView.js";

const DEFAULT_X_DIM = "Is Age > 40";
const DEFAULT_Y_DIM = "Gender";
const DEFAULT_LANG = "en";

export default class ParliamentPage extends Component {
  constructor(props) {
    super(props);
    let { selectedLang, activeMPId, xDim, yDim } = this.props;

    if (!selectedLang) {
      selectedLang = DEFAULT_LANG;
    }
    if (!xDim) {
      xDim = DEFAULT_X_DIM;
    }
    if (!yDim) {
      yDim = DEFAULT_Y_DIM;
    }

    this.state = {
      activeMPId,
      selectedLang,
      xDim,
      yDim,

      mpIdx: undefined,
      showStatisticalTrends: false,
    };
  }

  setStateWrapper(newState) {
    this.setState(
      newState,
      function () {
        const { xDim, yDim, activeMPId, selectedLang } = this.state;

        const paramStr = [selectedLang, activeMPId, xDim, yDim].join("#");
        window.history.pushState({}, null, "#" + encodeURI(paramStr));
      }.bind(this)
    );
  }

  getRandomMP() {
    const { mpIdx } = this.state;
    return MathX.randomChoice(Object.values(mpIdx));
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

  onDrawerClose() {
    this.setState({ activeMPId: null });
  }

  onDrawerRefresh() {
    this.onClickShowRandomMP();
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
    window.history.back();
    window.location.reload(false);
  }

  onClickShowRandomMP() {
    const randomMP = this.getRandomMP();
    this.setMP(randomMP.id, "Showed Random MP");
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
    let activeMPStr = activeMP ? activeMP.logString : "None";
    const isDrawerOpen = activeMP !== undefined;

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
      <ParliamentView
        selectedLang={selectedLang}
        activeMPId={activeMPId}
        xDim={xDim}
        yDim={yDim}
        mpIdx={mpIdx}
        cells={cells}
        xAxisLabels={xAxisLabels}
        yAxisLabels={yAxisLabels}
        showStatisticalTrends={showStatisticalTrends}
        activeMP={activeMP}
        isDrawerOpen={isDrawerOpen}
        onSelectLang={this.onSelectLang.bind(this)}
        onClickMP={this.onClickMP.bind(this)}
        onSelectMP={this.onSelectMP.bind(this)}
        onChangeXDim={this.onChangeXDim.bind(this)}
        onChangeYDim={this.onChangeYDim.bind(this)}
        onClickSwapDims={this.onClickSwapDims.bind(this)}
        onClickStatisticalTrends={this.onClickStatisticalTrends.bind(this)}
        onClickUndo={this.onClickUndo.bind(this)}
        onDrawerClose={this.onDrawerClose.bind(this)}
        onDrawerRefresh={this.onDrawerRefresh.bind(this)}
        onClickShowRandomMP={this.onClickShowRandomMP.bind(this)}
      />
    );
  }
}
