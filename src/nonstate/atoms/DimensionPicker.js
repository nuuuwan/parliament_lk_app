import { DIMENSION_LIST } from "../../core/Dimensions.js";

export default function DimensionPicker(props) {
  const { selectedDimension, onChange } = props;

  const onChangeInner = function (e) {
    return onChange(e.target.value);
  };
  return (
    <select defaultValue={selectedDimension} onChange={onChangeInner}>
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
