import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { DIMENSION_LIST } from "../../core/Dimensions.js";

export default function DimensionPicker(props) {
  const { label, selectedDimension, onChange } = props;

  const onChangeInner = function (e) {
    return onChange(e.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={selectedDimension}
        label={label}
        onChange={onChangeInner}
      >
        {DIMENSION_LIST.map(function (dimension, iDimension) {
          const key = `option-${iDimension}`;
          return (
            <MenuItem key={key} value={dimension}>
              {dimension}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
