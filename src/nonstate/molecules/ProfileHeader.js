import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { t } from "../../base/I18N.js";

const STYLE_AVATAR = { width: 100, height: 100 };

export default function ProfileHeader({ mp }) {
  return (
    <div style={{ margin: 10 }}>
      <Avatar alt={mp.name} src={mp.imageURL} sx={STYLE_AVATAR} />
      <Typography variant="h6" display="block">
        {t(mp.firstNames)}
      </Typography>
      <Typography variant="h4" display="block">
        {t(mp.lastName)}
      </Typography>
    </div>
  );
}
