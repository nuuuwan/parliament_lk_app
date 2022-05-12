import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";
import ChipOuter from "./ChipOuter.js";

export default function TitledChip({ title, body }) {
  return (
    <ChipOuter>
      <Typography sx={{ fontSize: "x-small", color: "gray" }}>
        {t(title)}
      </Typography>
      <Typography sx={{ fontSize: "normal" }}>{t(body)}</Typography>
    </ChipOuter>
  );
}
