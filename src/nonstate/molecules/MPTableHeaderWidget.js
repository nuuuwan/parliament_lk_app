import DimLabel from "../atoms/DimLabel.js";
import PercentWidget from "../atoms/PercentWidget.js";

export const STYLE_CELL = {
  textAlign: "center",
  borderColor: "#eee",
  borderStyle: "solid",
  borderWidth: 0.5,
  padding: 3,
  wordBreak: "normal",
  minWidth: 40,
};

const STYLE_HEADER_CELL = {
  ...STYLE_CELL,
  ...{
    backgroundColor: "#f8f8f8",
    overflow: "hidden",
  },
};

export default function MPTableHeaderWidget({ dim, mpCount, totalMPCount }) {
  return (
    <th style={STYLE_HEADER_CELL}>
      <DimLabel dim={dim} />
      <PercentWidget n={mpCount} d={totalMPCount} />
    </th>
  );
}
