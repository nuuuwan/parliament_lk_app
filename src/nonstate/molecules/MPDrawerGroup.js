import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";

import { DIM_GROUP_IDX } from "../../core/DimConstants.js";

export default function MPDrawerGroup({ name, children }) {
  let renderedIcon;
  const dimGroup = DIM_GROUP_IDX[name];
  if (dimGroup) {
    const Icon = dimGroup.Icon;
    renderedIcon = <Icon sx={{ color: "gray", padding: 0.5 }} />;
  }

  return (
    <Card sx={{ margin: 2 }} elevation="5">
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {renderedIcon}
          <Typography
            sx={{ fontSize: "x-small", color: "gray" }}
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
