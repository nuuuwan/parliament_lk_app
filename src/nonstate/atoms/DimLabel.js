import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";

export default function DimLabel({ dim }) {
  return <Typography sx={{ fontSize: "xx-small" }}>{t(dim)}</Typography>;
}
