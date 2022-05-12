import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { t } from "../../base/I18N.js";

const STYLE_AVATAR = { width: 100, height: 100 };

export default function ProfileHeader({ mp }) {
  return (
    <>
      <Avatar alt={mp.name} src={mp.imageURL} sx={STYLE_AVATAR} />
      <Typography variant="h5" display="block">
        {t(mp.firstNames)}
      </Typography>
      <Typography variant="h3" display="block">
        {t(mp.lastName)}
      </Typography>
    </>
  );
}
