import { DIMENSION_LIST } from "../../core/Dimensions.js";

const STYLE = {
  padding: 6,
  backgroundColor: "ghost",
  borderRadius: 6,
  borderStyle: "none",
};

export default function DimensionPicker(props) {
  const { selectedDimension, onChange } = props;

  const onChangeInner = function (e) {
    return onChange(e.target.value);
  };
  return (
    <select
      defaultValue={selectedDimension}
      onChange={onChangeInner}
      style={STYLE}
    >
      {DIMENSION_LIST.map(function (dimension, iDimension) {
        const key = `option-${iDimension}`;
        return (
          <option key={key} value={dimension}>
            {dimension}
          </option>
        );
      })}
    </select>
  );
}
