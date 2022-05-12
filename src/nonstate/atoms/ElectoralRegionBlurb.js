import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";

export default function ElectoralRegionBlurb({ mp }) {
  return (
    <>
      <Typography variant="body1" display="block">
        {t(mp.edName)}
      </Typography>
      {mp.edName === "National List" ? null : (
        <Typography variant="body2" display="block">
          {t(mp.provinceName)} Province
        </Typography>
      )}
    </>
  );
}
