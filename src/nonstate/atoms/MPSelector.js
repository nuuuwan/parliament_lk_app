import { t } from "../../base/I18N.js";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
        return <TextField {...mpSearchParams} placeholder="Search MPs" />;
      }}
      sx={{ minWidth: 300 }}
      autoHighlight
    />
  );
}
