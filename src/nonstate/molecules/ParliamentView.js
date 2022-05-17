import Box from "@mui/material/Box";

import MPTable from "../../nonstate/molecules/MPTable.js";
import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation.js";
import StatisticalTrendsWidget from "../../nonstate/molecules/StatisticalTrendsWidget.js";
import MPDrawer from "../../nonstate/molecules/MPDrawer.js";
import VersionWidget from "../../nonstate/atoms/VersionWidget.js";
import CustomAppBar from "../../nonstate/molecules/CustomAppBar.js";
import DimPanel from "../../nonstate/molecules/DimPanel.js";

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
}) {
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
