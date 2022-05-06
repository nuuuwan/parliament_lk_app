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
            return <th style={styleCellCustom}>{xLabel}</th>;
          })}
        </tr>

        {yAxisLabels.map(function (yLabel, iY) {
          return (
            <tr>
              {<th style={styleCellCustom}>{yLabel}</th>}
              {xAxisLabels.map(function (xLabel, iX) {
                const cellContents = cells[iX][iY];
                return <td style={styleCellCustom}>{cellContents}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
