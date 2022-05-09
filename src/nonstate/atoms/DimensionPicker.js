import React from "react";
import ReactGA from "react-ga";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import {
  GROUP_TO_DIMENSION_LIST,
  GROUP_TO_ICON,
} from "../../core/DimensionConstants.js";

export default function DimensionPicker(props) {
  const { label, selectedDimension, onChange, i18n } = props;

  const onChangeInner = function (e) {
    const dim = e.target.value;
    ReactGA.event({
      category: "Dimensions",
      action: `Changed Dim`,
      label: dim,
      value: 20,
    });
    return onChange(dim);
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
        {Object.entries(GROUP_TO_DIMENSION_LIST).map(function (
          [groupName, dimensionList],
          iGroup
        ) {
          const key = "group-" + groupName;
          const GroupIcon = GROUP_TO_ICON[groupName];
          return [
            <MenuItem key={key} disabled sx={{ marginTop: 2 }}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography type="caption">{i18n.t(groupName)}</Typography>
                }
              />
            </MenuItem>,
            dimensionList.map(function (dimension, iDimension) {
              const key = `option-${iDimension}`;
              return (
                <MenuItem key={key} value={dimension} sx={{ marginLeft: 2 }}>
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
