import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const STYLE_BOX = { padding: 3 };
const STYLE_AVATAR = { width: 100, height: 100 };

export default function MPDrawerView(props) {
  const { mp } = props;
  if (!mp) {
    return null;
  }
  return (
    <Box sx={STYLE_BOX}>
      <Avatar alt={mp.name} src={mp.imageURL} sx={STYLE_AVATAR} />
      <Typography variant="overline" display="block">
        {mp.party}
      </Typography>
      <Typography variant="h5" display="block">
        {mp.name}
      </Typography>
    </Box>
  );
}
