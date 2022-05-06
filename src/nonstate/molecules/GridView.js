import Grid from "@mui/material/Grid";
import PctWidget from "../atoms/PctWidget.js";
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
  overflow: "hidden",
  textAlign: "center",
  fontSize: 12,
  borderColor: "#ddd",
  borderStyle: "solid",
  borderWidth: 1,
};

export default function GridView(props) {
  const { cells, xAxisLabels, yAxisLabels } = props;

  return (
    <Paper elevation={1} sx={STYLE_PAPER}>
      <table style={STYLE_GRID}>
        <tbody>
          <tr>
            <td />
            {xAxisLabels.map(function (xLabel, iX) {
              const key = `x-label-${iX}`;

              const countX = yAxisLabels.reduce(function (countX, __, iY) {
                const cellContents = cells[iX][iY];
                const count = cellContents.length;
                return countX + count;
              }, 0);

              return (
                <td key={key} style={STYLE_CELL}>
                  <Typography variant="h6" gutterBottom component="div">
                    {xLabel}
                  </Typography>
                  <PctWidget count={countX} />
                </td>
              );
            })}
          </tr>

          {yAxisLabels.map(function (yLabel, iY) {
            const key = `row-${iY}`;

            const countY = xAxisLabels.reduce(function (countY, __, iX) {
              const cellContents = cells[iX][iY];
              const count = cellContents.length;
              return countY + count;
            }, 0);

            return (
              <tr key={key}>
                {
                  <td style={STYLE_CELL}>
                    <Typography variant="h6" gutterBottom component="div">
                      {yLabel}
                    </Typography>
                    <PctWidget count={countY} />
                  </td>
                }
                {xAxisLabels.map(function (xLabel, iX) {
                  const key = `cell-${iX}-${iY}`;
                  const cellContents = cells[iX][iY];
                  const count = cellContents.length;

                  return (
                    <td key={key} style={STYLE_CELL}>
                      {count > 0 ? (
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="center"
                        >
                          {cellContents}
                        </Grid>
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
