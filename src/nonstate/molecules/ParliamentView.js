import React from "react";

import Box from "@mui/material/Box";

import VersionWidget from "../../nonstate/atoms/VersionWidget.js";
import CustomAppBar from "../../nonstate/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation.js";
import DimPanel from "../../nonstate/molecules/DimPanel.js";
import MPDrawer from "../../nonstate/molecules/MPDrawer.js";
import MPTable from "../../nonstate/molecules/MPTable.js";
import StatisticalTrendsWidget from "../../nonstate/molecules/StatisticalTrendsWidget.js";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

export default function ParliamentView({
  selectedLang,
  activeMPId,
  xDim,
  yDim,

  mpIdx,
  cells,
  xAxisLabels,
  yAxisLabels,
  showStatisticalTrends,
  activeMP,
  isDrawerOpen,

  onSelectLang,
  onClickMP,
  onSelectMP,
  onChangeXDim,
  onChangeYDim,
  onClickSwapDims,
  onClickStatisticalTrends,
  onClickUndo,
  onDrawerClose,
  onDrawerRefresh,
  onClickShowRandomMP,
}) {
  return (
    <Box sx={STYLE}>
      <CustomAppBar
        mpIdx={mpIdx}
        activeMPId={activeMPId}
        selectedLang={selectedLang}
        onSelectMP={onSelectMP}
        onSelectLang={onSelectLang}
      />

      <DimPanel
        xDim={xDim}
        yDim={yDim}
        onChangeYDim={onChangeYDim}
        onClickSwapDims={onClickSwapDims}
        onChangeXDim={onChangeXDim}
      />

      <MPTable
        cells={cells}
        xAxisLabels={xAxisLabels}
        yAxisLabels={yAxisLabels}
        onClick={onClickMP}
        showStatisticalTrends={showStatisticalTrends}
      />

      <StatisticalTrendsWidget
        showStatisticalTrends={showStatisticalTrends}
        onClickStatisticalTrends={onClickStatisticalTrends}
      />

      <MPDrawer
        mp={activeMP}
        onClose={onDrawerClose}
        onRefresh={onDrawerRefresh}
        isDrawerOpen={isDrawerOpen}
      />

      <VersionWidget />

      <CustomBottomNavigation
        onClickUndo={onClickUndo}
        onClickStatisticalTrends={onClickStatisticalTrends}
        onClickShowRandomMP={onClickShowRandomMP}
      />
    </Box>
  );
}
