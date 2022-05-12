import * as React from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { t } from "../../base/I18N.js";

const STYLE_BOX = { padding: 3, maxWidth: "75%" };
const STYLE_AVATAR = { width: 100, height: 100 };

export default function MPDrawerView(props) {
  const { mp, onClose } = props;
  if (!mp) {
    return null;
  }

  return (
    <Box sx={STYLE_BOX}>
      <Grid container justifyContent="flex-end">
        <IconButton aria-label="delete" size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Grid>

      <Avatar alt={mp.name} src={mp.imageURL} sx={STYLE_AVATAR} />
      <Typography variant="h5" display="block">
        {t(mp.firstNames)}
      </Typography>
      <Typography variant="h3" display="block">
        {t(mp.lastName)}
      </Typography>
      <Typography variant="subtitle2" display="block">
        {t("Age") + " " + mp.ageFloor}
      </Typography>
      <Typography variant="overline" display="block">
        {t(mp.party)}
        {" - "}
        {t(mp.edName)}
      </Typography>
    </Box>
  );
}
