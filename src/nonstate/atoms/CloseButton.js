import React from "react";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function CloseButton({ onClose }) {
  return (
    <Grid container justifyContent="flex-end">
      <IconButton aria-label="delete" size="small" onClick={onClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Grid>
  );
}
