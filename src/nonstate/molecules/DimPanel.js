import React from "react";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import DimPicker from "../../nonstate/atoms/DimPicker.js";

export default function DimPanel({
  xDim,
  yDim,
  onChangeYDim,
  onClickSwapDims,
  onChangeXDim,
}) {
  return (
    <Grid container justifyContent="center">
      <DimPicker selectedDim={yDim} onChange={onChangeYDim} />

      <IconButton onClick={onClickSwapDims}>
        <SwapHorizIcon />
      </IconButton>
      <DimPicker selectedDim={xDim} onChange={onChangeXDim} />
    </Grid>
  );
}
