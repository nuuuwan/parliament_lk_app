import React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function RefreshButton({ onRefresh }) {
  return (
    <Grid container justifyContent="flex-end">
      <IconButton aria-label="delete" size="small" onClick={onRefresh}>
        <RefreshIcon fontSize="small" />
      </IconButton>
    </Grid>
  );
}
