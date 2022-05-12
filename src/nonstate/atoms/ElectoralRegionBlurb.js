import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";
import ChipOuter, { STYLE_TITLE, STYLE_BODY } from "../molecules/ChipOuter.js";

export default function ElectoralRegionBlurb({ mp }) {
  return (
    <ChipOuter>
      <Typography sx={STYLE_BODY}>{t(mp.edName)}</Typography>
      {mp.edName === "National List" ? null : (
        <>
          <Typography sx={STYLE_TITLE}>{t("Electoral District")}</Typography>
          <Typography sx={STYLE_BODY}>{t(mp.provinceName)}</Typography>
          <Typography sx={STYLE_TITLE}>{t("Province")}</Typography>
        </>
      )}
    </ChipOuter>
  );
}
