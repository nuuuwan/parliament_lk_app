import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { t } from "../../base/I18N.js";
import { DIM_GROUP_IDX } from "../../core/DimGroup.js";

export default function MPDrawerGroup({ name, children }) {
  let renderedIcon;
  const dimGroup = DIM_GROUP_IDX[name];
  if (dimGroup) {
    const Icon = dimGroup.Icon;
    renderedIcon = (
      <Icon sx={{ color: "lightgray", padding: 0.5, fontSize: "x-small" }} />
    );
  }

  return (
    <Card sx={{ margin: 1, padding: 0 }} elevation={1}>
      <CardContent sx={{ padding: 0.5, margin: 0.5 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {renderedIcon}
          <Typography
            sx={{ fontSize: "x-small", color: "lightgray" }}
            component="span"
          >
            {t(name)}
          </Typography>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
