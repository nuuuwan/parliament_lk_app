const DIMENSIONS_LIST = [
  "Age Group",
  "Party",
  "Is National List",
  "Electoral District",
  "Religion",
  "Is Sinhala Buddhist",
  "Profession",
];

export default function DimensionPicker(props) {
  const { selectedDimension, onChange } = props;

  const onChangeInner = function (e) {
    return onChange(e.target.value);
  };
  return (
    <select defaultValue={selectedDimension} onChange={onChangeInner}>
      {DIMENSIONS_LIST.map(function (dimension, iDimension) {
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
