export default function GridView(props) {
  const { cells, xAxisLabels, yAxisLabels } = props;

  const styleGrid = {
    borderCollapse: "collapse",
    tableLayout: "fixed",
  };

  const styleCellCustom = {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "lightgray",
    overflow: "hidden",
    textAlign: "center",
    fontSize: 9,
  };

  return (
    <table style={styleGrid}>
      <tbody>
        <tr>
          <th />
          {xAxisLabels.map(function (xLabel, iX) {
            const key = `x-label-${iX}`;
            return (
              <th key={key} style={styleCellCustom}>
                {xLabel}
              </th>
            );
          })}
        </tr>

        {yAxisLabels.map(function (yLabel, iY) {
          const key = `row-${iY}`;
          return (
            <tr key={key}>
              {<th style={styleCellCustom}>{yLabel}</th>}
              {xAxisLabels.map(function (xLabel, iX) {
                const key = `cell-${iX}-${iY}`;
                const cellContents = cells[iX][iY];
                return (
                  <td key={key} style={styleCellCustom}>
                    {cellContents}
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
