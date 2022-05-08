import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";

import { GROUP_TO_DIMENSION_LIST } from "../../core/Dimensions.js";

export default function DimensionPicker(props) {
  const { label, selectedDimension, onChange, i18n } = props;

  const onChangeInner = function (e) {
    return onChange(e.target.value);
  };
  return (
    <FormControl fullWidth size="small" margin="normal">
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={selectedDimension}
        label={label}
        onChange={onChangeInner}
      >
        {Object.entries(GROUP_TO_DIMENSION_LIST).map(function (
          [groupName, dimensionList],
          iGroup
        ) {
          const key = "group-" + groupName;
          return [
            <ListSubheader key={key}>{i18n.t(groupName)}</ListSubheader>,
            dimensionList.map(function (dimension, iDimension) {
              const key = `option-${iDimension}`;
              return (
                <MenuItem key={key} value={dimension}>
                  {i18n.t(dimension)}
                </MenuItem>
              );
            }),
          ];
        })}
      </Select>
    </FormControl>
  );
}
