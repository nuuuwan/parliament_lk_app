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

export default function GridView(props) {
  const { cells, xAxisLabels, yAxisLabels } = props;

  const renderedXAxisHeader = (
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
            <Typography variant="caption" gutterBottom component="div">
              {xLabel}
            </Typography>
            <Typography variant="h6">{countX}</Typography>
          </td>
        );
      })}
    </tr>
  );

  return (
    <Paper elevation={0} sx={STYLE_PAPER}>
      <table style={STYLE_GRID}>
        <tbody>
          {renderedXAxisHeader}

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
                    <Typography variant="caption" gutterBottom component="div">
                      {yLabel}
                    </Typography>
                    <Typography variant="h6">{countY}</Typography>
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
                {
                  <td style={STYLE_CELL}>
                    <Typography variant="caption" gutterBottom component="div">
                      {yLabel}
                    </Typography>
                    <Typography variant="h6">{countY}</Typography>
                  </td>
                }
              </tr>
            );
          })}

          {renderedXAxisHeader}
        </tbody>
      </table>
    </Paper>
  );
}
