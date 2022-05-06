import Grid from "@mui/material/Grid";
import PctWidget from "../atoms/PctWidget.js";

const STYLE_GRID = {
  marginTop: 32,
  borderCollapse: "collapse",
  tableLayout: "fixed",
};

const STYLE_CELL = {
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "lightgray",
  overflow: "hidden",
  textAlign: "center",
  fontSize: 12,
};

export default function GridView(props) {
  const { cells, xAxisLabels, yAxisLabels } = props;

  return (
    <table style={STYLE_GRID}>
      <tbody>
        <tr>
          <th />
          {xAxisLabels.map(function (xLabel, iX) {
            const key = `x-label-${iX}`;

            const countX = yAxisLabels.reduce(function (countX, __, iY) {
              const cellContents = cells[iX][iY];
              const count = cellContents.length;
              return countX + count;
            }, 0);

            return (
              <th key={key} style={STYLE_CELL}>
                {xLabel}
                <PctWidget count={countX} />
              </th>
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
                <th style={STYLE_CELL}>
                  {yLabel}
                  <PctWidget count={countY} />
                </th>
              }
              {xAxisLabels.map(function (xLabel, iX) {
                const key = `cell-${iX}-${iY}`;
                const cellContents = cells[iX][iY];
                const count = cellContents.length;

                const countX = yAxisLabels.reduce(function (countX, __, iY) {
                  const cellContents = cells[iX][iY];
                  const count = cellContents.length;
                  return countX + count;
                }, 0);

                return (
                  <td key={key} style={STYLE_CELL}>
                    <Grid container alignItems="center" justifyContent="center">
                      {cellContents}
                    </Grid>
                    <PctWidget
                      count={count}
                      countY={countY}
                      countX={countX}
                      xLabel={xLabel}
                      yLabel={yLabel}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
