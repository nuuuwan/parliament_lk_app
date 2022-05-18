import React from "react";
import Typography from "@mui/material/Typography";

import MathXFuture from "../../base/MathXFuture.js";
import MPCountWidget from "./MPCountWidget.js";

const STYLE = { fontSize: "small", fontWeight: "bold" };

export default function PercentWidget({ n, d }) {
  if (d === 0 || n === 0) {
    return null;
  }

  const p = n / d;

  const a = p > 0.1 ? 1 : 0.1;
  const pStr = MathXFuture.round(p * 100, a) + "%";

  return (
    <>
      <MPCountWidget mpCount={n} />
      <Typography sx={STYLE}>{pStr}</Typography>
    </>
  );
}
