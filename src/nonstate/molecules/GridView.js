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
  fontSize: 9,
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
            return (
              <th key={key} style={STYLE_CELL}>
                {xLabel}
              </th>
            );
          })}
        </tr>

        {yAxisLabels.map(function (yLabel, iY) {
          const key = `row-${iY}`;
          return (
            <tr key={key}>
              {<th style={STYLE_CELL}>{yLabel}</th>}
              {xAxisLabels.map(function (xLabel, iX) {
                const key = `cell-${iX}-${iY}`;
                const cellContents = cells[iX][iY];
                const n = cellContents.length;
                return (
                  <td key={key} style={STYLE_CELL}>
                    {cellContents}
                    <PctWidget n={n} />
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
