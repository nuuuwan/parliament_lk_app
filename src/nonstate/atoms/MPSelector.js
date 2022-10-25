import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { t } from "../../base/I18N.js";
import MP from "../../core/MP.js";

export default function MPSelector({ mpIdx, activeMPId, onSelectMP }) {
  const mpList = Object.values(mpIdx).sort(MP.cmpName);

  return (
    <Autocomplete
      disablePortal
      placeholder="Search for MP"
      options={mpList}
      isOptionEqualToValue={function (option, value) {
        return option.id === value.id;
      }}
      getOptionLabel={function (mp) {
        return t(mp.lastName) + ", " + t(mp.firstNames);
      }}
      groupBy={(mp) => mp.lastName[0]}
      onChange={(event, newValue) => {
        onSelectMP(newValue.id);
      }}
      renderInput={function (mpSearchParams) {
        return (
          <TextField
            placeholder="Search MPs"
            sx={{
              input: {
                backgroundColor: "#f0f0f0",
                fontSize: "small",
              },
              div: {
                backgroundColor: "#f0f0f0",
              },
            }}
            {...mpSearchParams}
          />
        );
      }}
      sx={{ minWidth: Math.min(window.innerWidth - 150, 400) }}
      size="small"
      autoHighlight
    />
  );
}
