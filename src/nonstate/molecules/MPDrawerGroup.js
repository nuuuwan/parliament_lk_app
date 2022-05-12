import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";

import { DIM_GROUP_IDX } from "../../core/DimConstants.js";

export default function MPDrawerGroup({ name }) {
  const dimGroup = DIM_GROUP_IDX[name];
  const Icon = dimGroup.Icon;

  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon sx={{ color: "gray", padding: 0.5 }} />
          <Typography
            sx={{ fontSize: "x-small", color: "gray" }}
            component="span"
          >
            {t(name)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
