import React from "react";
import Typography from "@mui/material/Typography";
import { DATE_LAST_UPDATE } from "../../constants/Constants.js";

const STYLE_VERSION = {
  fontSize: "50%",
  flexGrow: 1,
  margin: 1,
  color: "ghost",
  textAlign: "center",
};

export default function VersionWidget() {
  return (
    <Typography sx={STYLE_VERSION}>Last Updated {DATE_LAST_UPDATE}</Typography>
  );
}
