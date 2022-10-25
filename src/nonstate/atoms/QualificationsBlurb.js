import React from "react";

import Typography from "@mui/material/Typography";

export default function QualificationsBlurb({ body }) {
  if (!body) {
    return null;
  }
  return (
    <Typography
      variant="body2"
      sx={{
        maxWidth: 300,
        fontSize: "x-small",
        color: "gray",
        margin: 0.5,
        fontStyle: "italic",
      }}
    >
      {body}
    </Typography>
  );
}
