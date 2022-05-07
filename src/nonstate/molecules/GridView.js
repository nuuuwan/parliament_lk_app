import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const STYLE_PAPER = {
  margin: 2,
  padding: 3,
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
  padding: 12,
};

function DimWidget({ dim }) {
  return (
    <>
      <Typography variant="body1">{dim}</Typography>
    </>
  );
}

function NWidget({ n }) {
  if (n === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="subtitle2">{n}</Typography>
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
      <Typography variant="h6">{pStr}</Typography>
      <NWidget n={n} />
    </>
  );
}

export default function GridView(props) {
  const { cells, xAxisLabels, yAxisLabels } = props;
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
    }, 0);;
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
                <td key={key} style={STYLE_CELL}>
                  <DimWidget dim={xLabel} />
                  <PctWidget n={countX} d={countXY} />
                </td>
              );
            })}
          </tr>

          {yAxisLabels.map(function (yLabel, iY) {
            const key = `row-${iY}`;

            const countY = getCountY(iY);

            return (
              <tr key={key}>
                {
                  <td style={STYLE_CELL}>
                    <DimWidget dim={yLabel} />
                    <PctWidget n={countY} d={countXY} />
                  </td>
                }
                {xAxisLabels.map(function (xLabel, iX) {
                  const key = `cell-${iX}-${iY}`;
                  const cellContents = cells[iX][iY];
                  const count = cellContents.length;

                  const countX = getCountX(iX);

                  let statisticsBlurb;
                  let styleCellCustom;
                  if (count > 0) {
                    const [n, p] = [countXY, countX * countY / countXY / countXY];
                    const meanCount = n * p;
                    const stdevCount = Math.sqrt(n * p * (1 - p));
                    const z = (count - meanCount) / stdevCount;
                    const lowerCount = parseInt(meanCount- stdevCount * 2 + 0.5);
                    const upperCount = parseInt(meanCount +stdevCount * 2 + 0.5);
                    statisticsBlurb = `(Exp. ${lowerCount} to ${upperCount})`;
                    const h = (z > 0) ? 0 : 120;
                    const absZ = Math.abs(z);
                    let l = 100;
                    if (absZ > 2) {
                      l = 100 - 30 * Math.min(2, absZ - 2) / 2;
                    }
                    const a = 0.3;
                    const s = 100;
                    styleCellCustom = {
                      backgroundColor: `hsla(${h},${s}%,${l}%,${a})`,
                    }
                  }

                  return (
                    <td key={key} style={{...STYLE_CELL, ...styleCellCustom}}>
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
                      <NWidget n={statisticsBlurb} />
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
