import DataStructuresFuture from '../../base/DataStructuresFuture.js';

export default function GridView(props) {
  const {cells, xAxisLabels, margin} = props;

  const nX = cells.length;
  const nY = cells[0].length;

  const styleGrid = {
    margin: margin,
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  }

  const styleRowCustom = {
  }

  const styleCellCustom = {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 9,
  }

  return (
    <table style={styleGrid}>
      <tbody>
      <tr style={styleRowCustom}>
        {xAxisLabels.map(
          function(label, iLabel) {
            return (
              <th style={styleCellCustom}>
                {label}
              </th>
            );
          },
        )}
      </tr>

      {DataStructuresFuture.range(0, nY).map(
        function(iY) {
          return (
            <tr style={styleRowCustom}>
              {DataStructuresFuture.range(0, nX).map(
                function(iX) {
                  const cellContents = cells[iX][nY - iY - 1];
                  return (
                    <td style={styleCellCustom}>
                      {cellContents}
                    </td>
                  );
                },
              )}
            </tr>
          );
        },
      )}
      </tbody>
    </table>
  );
}
