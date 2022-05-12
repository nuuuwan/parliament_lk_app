import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";

const STYLE = {
  backgroundColor: "#f8f8f8",
  padding: "5%",
  borderRadius: "30%",
  display: "inline-block",
};

export default function TitledChip({ title, body }) {
  return (
    <div style={STYLE}>
      <Typography sx={{ fontSize: "xx-small", color: "gray" }}>
        {t(title)}
      </Typography>
      <Typography sx={{ fontSize: "small" }}>{t(body)}</Typography>
    </div>
  );
}
