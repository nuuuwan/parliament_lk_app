import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { t } from "../../base/I18N.js";
import { PARTY_IDX } from "../../core/Party.js";

const AVATAR_SIZE = 100;

export default function ProfileHeader({ mp }) {
  const color = PARTY_IDX[mp.party];
  const style = {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderColor: color,
    borderWidth: AVATAR_SIZE / 10,
    borderStyle: "solid",
  };
  return (
    <div style={{ margin: 1 }}>
      <Avatar alt={mp.name} src={mp.imageURL} sx={style} />
      <Typography variant="subtitle2" display="block">
        {t(mp.firstNames)}
      </Typography>
      <Typography variant="h6" display="block">
        {t(mp.lastName)}
      </Typography>
    </div>
  );
}
