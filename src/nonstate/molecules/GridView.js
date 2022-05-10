import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";

const STYLE_PAPER = {
  margin: 1,
  padding: 2,
};
const STYLE_GRID = {
  borderCollapse: "collapse",
  tableLayout: "fixed",
};

const STYLE_CELL = {
  textAlign: "center",
  borderColor: "#eee",
  borderStyle: "solid",
  borderWidth: 2,
  padding: 6,
};

const STYLE_HEADER_CELL = {
  ...STYLE_CELL,
  ...{
    backgroundColor: "#f8f8f8",
  },
};

const COLOR_SWITCH_ON = "#1976D2";

function DimWidget({ dim }) {
  return (
    <>
      <Typography variant="body1" sx={{ fontSize: "x-small" }}>
        {t(dim)}
      </Typography>
    </>
  );
}

function NWidget({ n }) {
  if (n === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="caption">{n}</Typography>
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
      <Typography variant="subtitle1">{pStr}</Typography>
      <NWidget n={n} />
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
    <Paper elevation={0} sx={STYLE_PAPER}>
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

                  let statisticsBlurb;
                  let styleCellCustom;
                  if (showStatisticalTrends && count > 0) {
                    const [n, p] = [
                      countXY,
                      (countX * countY) / countXY / countXY,
                    ];
                    const meanCount = n * p;
                    const stdevCount = Math.sqrt(n * p * (1 - p));
                    const z = (count - meanCount) / stdevCount;
                    const absZ = Math.abs(z);
                    let humanText = "";

                    if (absZ > 1) {
                      if (z >= 4) {
                        humanText = "Highly significantly more";
                      } else if (z <= -4) {
                        humanText = "Highly significantly fewer";
                      } else if (z >= 2) {
                        humanText = "Significantly more";
                      } else if (z <= -2) {
                        humanText = "Significantly fewer";
                      } else if (z >= 1) {
                        humanText = "Slightly more";
                      } else if (z <= -1) {
                        humanText = "Slightly fewer";
                      }
                    }

                    const lowerCount =
                      parseInt((meanCount - stdevCount * 2) * 10 + 0.5) / 10;
                    const upperCount =
                      parseInt((meanCount + stdevCount * 2) * 10 + 0.5) / 10;

                    let lowHighStr = `${lowerCount} - ${upperCount}`;
                    if (lowerCount === upperCount) {
                      lowHighStr = `${lowerCount}`;
                    }

                    const zStr = parseInt(z * 10 + 0.5) / 10;
                    statisticsBlurb = (
                      <>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          color={COLOR_SWITCH_ON}
                        >
                          {t(humanText)}
                        </Typography>
                        <Typography
                          variant="caption"
                          component="span"
                          color={COLOR_SWITCH_ON}
                        >
                          {lowHighStr}
                        </Typography>
                        <Typography
                          variant="caption"
                          component="span"
                          color={COLOR_SWITCH_ON}
                        >
                          {` (z = ${zStr})`}
                        </Typography>
                      </>
                    );

                    const h = z > 0 ? 0 : 120;
                    const MAX_ABS_Z = 4;
                    const ABS_Z_LIMIT = 2;
                    let l = 100;
                    const [MIN_H, MAX_H] = [40, 70];
                    if (absZ > ABS_Z_LIMIT) {
                      l =
                        MAX_H -
                        ((MAX_H - MIN_H) *
                          Math.min(
                            MAX_ABS_Z - ABS_Z_LIMIT,
                            absZ - ABS_Z_LIMIT
                          )) /
                          (MAX_ABS_Z - ABS_Z_LIMIT);
                    }

                    const a = 0.3;
                    const s = 100;
                    styleCellCustom = {
                      backgroundColor: `hsla(${h},${s}%,${l}%,${a})`,
                    };
                  }

                  return (
                    <td key={key} style={{ ...STYLE_CELL, ...styleCellCustom }}>
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
                      {statisticsBlurb}
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
