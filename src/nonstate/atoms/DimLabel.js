import React from "react";

import Typography from "@mui/material/Typography";

import { t } from "../../base/I18N.js";

const STYLE = {
  fontSize: "xx-small",
  color: "gray",
};

export default function DimLabel({ dim }) {
  return <Typography sx={STYLE}>{t(dim)}</Typography>;
}
