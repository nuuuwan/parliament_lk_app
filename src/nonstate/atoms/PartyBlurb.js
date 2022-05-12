import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";

export default function PartyBlurb({ mp }) {
  return (
    <Typography variant="body1" display="block">
      {t(mp.party)}
    </Typography>
  );
}
