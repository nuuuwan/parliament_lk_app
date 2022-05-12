import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";
import ChipOuter, { STYLE_TITLE, STYLE_BODY } from "./ChipOuter.js";

export default function TitledChip({ title, body, titleAtBottom }) {
  if (!body) {
    return null;
  }

  const renderedTitle = <Typography sx={STYLE_TITLE}>{t(title)}</Typography>;

  return (
    <ChipOuter>
      {titleAtBottom ? null : renderedTitle}
      <Typography sx={STYLE_BODY}>{t(body)}</Typography>
      {titleAtBottom ? renderedTitle : null}
    </ChipOuter>
  );
}
