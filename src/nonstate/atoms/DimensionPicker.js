import React from "react";
import ReactGA from "react-ga";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import {t} from "../../base/I18N.js";

import {
  DIMENSION_GROUP_LIST,
  GROUP_TO_DIMENSION_LIST,
} from "../../core/DimensionConstants.js";

export default function DimensionPicker(props) {
  const { label, selectedDimension, onChange } = props;

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
        {DIMENSION_GROUP_LIST.map(function (
          dimensionGroup,
          iGroup
        ) {
          const key = "group-" + dimensionGroup.name;
          const GroupIcon = dimensionGroup.Icon;
          const dimensionList = GROUP_TO_DIMENSION_LIST[dimensionGroup.name];

          return [
            <MenuItem key={key} disabled sx={{ marginTop: 2 }}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography type="caption">
                    {t(dimensionGroup.name)}
                  </Typography>
                }
              />
            </MenuItem>,
            dimensionList.map(function (dimension, iDimension) {
              const key = `option-${dimension.name}`;
              return (
                <MenuItem key={key} value={dimension.name} sx={{ marginLeft: 2 }}>
                  {t(dimension.name)}
                </MenuItem>
              );
            }),
          ];
        })}
      </Select>
    </FormControl>
  );
}
