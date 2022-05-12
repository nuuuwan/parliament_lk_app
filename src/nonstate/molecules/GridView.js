import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";
import StatisticalTrendsBlurb from "./StatisticalTrendsBlurb.js";

const STYLE_GRID = {
  borderCollapse: "collapse",
  tableLayout: "fixed",
};

const STYLE_CELL = {
  textAlign: "center",
  borderColor: "#eee",
  borderStyle: "solid",
  borderWidth: 1,
  padding: 3,
};

const STYLE_HEADER_CELL = {
  ...STYLE_CELL,
  ...{
    backgroundColor: "#f8f8f8",
  },
};

function DimWidget({ dim }) {
  return (
    <>
      <Typography sx={{ fontSize: "x-small" }}>{t(dim)}</Typography>
    </>
  );
}

function NWidget({ n }) {
  if (n === 0) {
    return null;
  }

  return (
    <>
      <Typography sx={{ fontSize: "small" }}>{n}</Typography>
    </>
  );
}

function PctWidget({ n, d }) {
  if (n === 0) {
    return null;
  }

  const p = n / d;
  let pStr;
  if (p > 0.1) {
    pStr = parseInt(100 * p + 0.5) + "%";
  } else if (p > 0.01) {
    pStr = parseInt(100 * p * 10 + 0.5) / 10 + "%";
  } else if (p > 0.001) {
    pStr = parseInt(100 * p * 100 + 0.5) / 100 + "%";
  } else {
    pStr = "<0.1%";
  }
  return (
    <>
      <NWidget n={n} />
      <Typography sx={{ fontSize: "xx-small" }}>{pStr}</Typography>
    </>
  );
}

export default function GridView(props) {
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
      <table style={STYLE_GRID}>
        <tbody>
          <tr>
            <td />
            {xAxisLabels.map(function (xLabel, iX) {
              const key = `x-label-${iX}`;

              const countX = getCountX(iX);

              return (
                <th key={key} style={STYLE_HEADER_CELL}>
                  <DimWidget dim={xLabel} />
                  <PctWidget n={countX} d={countXY} />
                </th>
              );
            })}
          </tr>

          {yAxisLabels.map(function (yLabel, iY) {
            const key = `row-${iY}`;

            const countY = getCountY(iY);

            return (
              <tr key={key}>
                {
                  <th style={STYLE_HEADER_CELL}>
                    <DimWidget dim={yLabel} />
                    <PctWidget n={countY} d={countXY} />
                  </th>
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
                      <NWidget n={count} />
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
    </Paper>
  );
}
