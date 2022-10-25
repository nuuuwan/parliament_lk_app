import React from "react";
import ReactGA from "react-ga";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { t } from "../../base/I18N.js";
import { DIM_GROUP_LIST } from "../../core/DimGroup.js";
import { DIM_GROUP_NAME_TO_DIM_LIST } from "../../core/DimTree.js";

export default function DimPicker(props) {
  const { label, selectedDim, onChange } = props;

  const onChangeInner = function (e) {
    const dim = e.target.value;
    ReactGA.event({
      category: "Dims",
      action: `Changed Dim`,
      label: dim,
      value: 20,
    });
    return onChange(dim);
  };
  return (
    <FormControl sx={{ m: 1 }} size="small">
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <Select
        value={selectedDim}
        label={label}
        onChange={onChangeInner}
        sx={{ fontSize: "x-small" }}
      >
        {DIM_GROUP_LIST.map(function (dimGroup, iGroup) {
          const key = "group-" + dimGroup.name;
          const GroupIcon = dimGroup.Icon;
          const dimList = DIM_GROUP_NAME_TO_DIM_LIST[dimGroup.name];

          return [
            <MenuItem key={key} disabled sx={{ marginTop: 2 }}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography type="caption">{t(dimGroup.name)}</Typography>
                }
              />
            </MenuItem>,
            dimList.map(function (dim, iDim) {
              const key = `option-${dim.name}`;
              return (
                <MenuItem key={key} value={dim.name} sx={{ marginLeft: 2 }}>
                  {t(dim.name)}
                </MenuItem>
              );
            }),
          ];
        })}
      </Select>
    </FormControl>
  );
}
