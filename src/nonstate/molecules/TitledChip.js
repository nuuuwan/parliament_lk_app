import React from "react";
import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";
import ChipOuter, { STYLE_TITLE, STYLE_BODY } from "./ChipOuter.js";

export default function TitledChip({
  title,
  body,
  titleAtBottom,
  disableTranslate,
}) {
  if (!body) {
    return null;
  }

  const renderedTitle = <Typography sx={STYLE_TITLE}>{t(title)}</Typography>;

  const renderedBody = disableTranslate ? body : t(body);
  return (
    <ChipOuter>
      {titleAtBottom ? null : renderedTitle}
      <Typography sx={STYLE_BODY}>{renderedBody}</Typography>
      {titleAtBottom ? renderedTitle : null}
    </ChipOuter>
  );
}
