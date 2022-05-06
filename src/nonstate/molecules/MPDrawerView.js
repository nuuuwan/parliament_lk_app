import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

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
      <Typography variant="h5" display="block">
        {mp.firstNames}
      </Typography>
      <Typography variant="h4" display="block">
        {mp.lastName}
      </Typography>
      <Typography variant="subtitle1" display="caption text">
        {mp.profession}
      </Typography>
      <Typography variant="overline" display="block">
        {mp.party + " - " + mp.electoralDistrict}
      </Typography>

      <Typography variant="subtitle1" display="block">
        <HomeIcon />
        {mp.addressSitting}
      </Typography>
      <Typography variant="subtitle1" display="block">
        <PhoneIcon />
        <Link href={"tel:" + mp.phoneSitting} variant="body2" underline="hover">
          {mp.phoneSitting}
        </Link>
      </Typography>

      <Typography variant="subtitle1" display="block">
        <HomeIcon />
        {mp.address}
      </Typography>
      <Typography variant="subtitle1" display="block">
        <PhoneIcon />
        <Link href={"tel:" + mp.phone} variant="body2" underline="hover">
          {mp.phone}
        </Link>
      </Typography>

      <Typography variant="subtitle1" display="block">
        <EmailIcon />
        <Link href={"mailto:" + mp.email} variant="body2" underline="hover">
          {mp.email}
        </Link>
      </Typography>

      <Stack direction="row" spacing={1}>
        <Chip label={mp.civilStatus} variant="outlined" />
        <Chip label={mp.religion} variant="outlined" />
        <Chip label={parseInt(mp.age) + " years"} variant="outlined" />
      </Stack>
    </Box>
  );
}
