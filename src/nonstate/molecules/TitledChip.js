import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";
import ChipOuter, { STYLE_TITLE, STYLE_BODY } from "./ChipOuter.js";

export default function TitledChip({ title, body }) {
  return (
    <ChipOuter>
      <Typography sx={STYLE_TITLE}>{t(title)}</Typography>
      <Typography sx={STYLE_BODY}>{t(body)}</Typography>
    </ChipOuter>
  );
}
