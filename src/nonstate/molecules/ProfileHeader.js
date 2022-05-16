import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { t } from "../../base/I18N.js";
import { PARTY_IDX } from "../../core/Party.js";

const AVATAR_SIZE = 100;

export default function ProfileHeader({ mp }) {
  const color = PARTY_IDX[mp.party];
  const styleAvatar = {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderColor: color,
    borderWidth: AVATAR_SIZE / 10,
    borderStyle: "solid",
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Avatar alt={mp.name} src={mp.imageURL} sx={styleAvatar} />
      <Typography variant="subtitle2" display="block">
        {t(mp.firstNames)}
      </Typography>
      <Typography variant="h6" display="block">
        {t(mp.lastName)}
      </Typography>
    </Grid>
  );
}
