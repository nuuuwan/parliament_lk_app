import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GavelIcon from "@mui/icons-material/Gavel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const STYLE_BOX = { padding: 3 };
const STYLE_AVATAR = { width: 100, height: 100 };

function Address({ address, isSitting }) {
  if (!address) {
    return null;
  }
  address = address.replace(",", ", ").replace("  ", " ");
  const href =
    "https://www.google.com/maps/search/" + address.replace(" ", "+");
  const secondaryText = isSitting ? "Sitting" : "";
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={href}>
        <ListItemIcon>
          <HomeIcon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={address} secondary={secondaryText} />
      </ListItemButton>
    </ListItem>
  );
}

function Phone({ phone }) {
  if (!phone) {
    return null;
  }
  const href = "tel:" + phone;
  const phoneStr = [
    phone.substring(0, 3),
    phone.substring(3, 6),
    phone.substring(6, 10),
  ].join("-");

  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={href}>
        <ListItemIcon>
          <PhoneIcon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={phoneStr} />
      </ListItemButton>
    </ListItem>
  );
}

function Email({ email }) {
  if (!email) {
    return null;
  }

  const href = "mailto:" + email;
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={href}>
        <ListItemIcon>
          <EmailIcon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={email} />
      </ListItemButton>
    </ListItem>
  );
}

function Wikipedia({ searchText }) {
  if (!searchText) {
    return null;
  }

  const href =
    "https://en.wikipedia.org/w/index.php?search=" +
    searchText.replace(" ", "+");
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={href}>
        <ListItemIcon>
          <TravelExploreIcon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={"Wikipedia"} />
      </ListItemButton>
    </ListItem>
  );
}

function Pariament({ id }) {
  const href = "https://www.parliament.lk/component/members/viewMember/" + id;
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={href}>
        <ListItemIcon>
          <GavelIcon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={"Parliment.LK"} />
      </ListItemButton>
    </ListItem>
  );
}

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

      <List>
        <Phone phone={mp.phoneSitting} />

        <Address address={mp.addressSitting} isSitting={true} />

        <Phone phone={mp.phone} />

        <Address address={mp.address} isSitting={false} />

        <Email email={mp.email} />
      </List>

      <Stack direction="row" spacing={1}>
        <Chip label={mp.civilStatus} variant="outlined" />
        <Chip label={mp.religion} variant="outlined" />
        <Chip label={parseInt(mp.age) + " years"} variant="outlined" />
      </Stack>

      <List>
        <Wikipedia searchText={mp.name} />
        <Pariament id={mp.id} />
      </List>
    </Box>
  );
}
