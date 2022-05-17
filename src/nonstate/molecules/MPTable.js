import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import StatisticalTrendsBlurb from "./StatisticalTrendsBlurb.js";
import MPCountWidget from "../atoms/MPCountWidget.js";
import MPTableHeaderWidget, { STYLE_CELL } from "./MPTableHeaderWidget.js";

const STYLE_DIV = {
  overflowX: "scroll",
};

const STYLE_TABLE = {
  borderCollapse: "collapse",
  tableLayout: "fixed",
  maxWidth: "100%",
};

export default function MPTable(props) {
  const { cells, xAxisLabels, yAxisLabels, showStatisticalTrends } = props;
  const countXY = 225;

  function getCountX(iX) {
    return yAxisLabels.reduce(function (countX, __, iY) {
      const cellContents = cells[iX][iY];
      const count = cellContents.length;
      return countX + count;
    }, 0);
  }

  function getCountY(iY) {
    return xAxisLabels.reduce(function (countY, __, iX) {
      const cellContents = cells[iX][iY];
      const count = cellContents.length;
      return countY + count;
    }, 0);
  }

  return (
    <Paper elevation={0}>
      <div style={STYLE_DIV}>
        <table style={STYLE_TABLE}>
          <tbody>
            <tr>
              <td />
              {xAxisLabels.map(function (xLabel, iX) {
                const key = `x-label-${iX}`;
                const countX = getCountX(iX);

                return (
                  <MPTableHeaderWidget
                    key={key}
                    dim={xLabel}
                    mpCount={countX}
                    totalMPCount={countXY}
                  />
                );
              })}
            </tr>

            {yAxisLabels.map(function (yLabel, iY) {
              const key = `row-${iY}`;

              const countY = getCountY(iY);

              return (
                <tr key={key}>
                  {
                    <MPTableHeaderWidget
                      key={""}
                      dim={yLabel}
                      mpCount={countY}
                      totalMPCount={countXY}
                    />
                  }
                  {xAxisLabels.map(function (xLabel, iX) {
                    const key = `cell-${iX}-${iY}`;
                    const cellContents = cells[iX][iY];
                    const count = cellContents.length;
                    const countX = getCountX(iX);

                    const showStatisticalTrendsInner =
                      showStatisticalTrends && count > 0;

                    return (
                      <td key={key} style={{ ...STYLE_CELL }}>
                        {count > 0 ? (
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                          >
                            {cellContents}
                          </Grid>
                        ) : null}
                        <MPCountWidget mpCount={count} />
                        {showStatisticalTrendsInner ? (
                          <StatisticalTrendsBlurb
                            countXY={countXY}
                            countX={countX}
                            countY={countY}
                            count={count}
                          />
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Paper>
  );
}
