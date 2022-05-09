import * as React from "react";
import ReactGA from "react-ga";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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

const STYLE_BOX = { padding: 3, maxWidth: "75%" };
const STYLE_AVATAR = { width: 100, height: 100 };

function getSittingText(i18n, isSitting) {
  return i18n.t(
    isSitting ? "When attending parliament" : "When not attending parliament"
  );
}

function CustomLink({ gaAction, primary, secondary, href, Icon }) {
  const onClick = function (e) {
    ReactGA.event({
      category: "External Links - Drawer",
      action: "Clicked Drawer - " + gaAction,
      label: href,
    });
    window.open(href, "_blank");
  };
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" onClick={onClick}>
        <ListItemIcon>
          <Icon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItemButton>
    </ListItem>
  );
}

function Address({ gaAction, i18n, address, isSitting }) {
  if (!address) {
    return null;
  }
  address = address.replaceAll(",", ", ");
  const href =
    "https://www.google.com/maps/search/" +
    address.replaceAll(" ", "+").replaceAll("/", "+");
  const renderedAddress = address.split(", ").map(function (line, i) {
    return <div key={i}>{line}</div>;
  });
  return (
    <CustomLink
      primary={renderedAddress}
      secondary={getSittingText(i18n, isSitting)}
      href={href}
      Icon={HomeIcon}
      gaAction={gaAction + "-address"}
    />
  );
}

function Phone({ gaAction, i18n, phone, isSitting }) {
  if (!phone) {
    return null;
  }
  return (
    <CustomLink
      primary={phone}
      secondary={getSittingText(i18n, isSitting)}
      href={"tel:" + phone}
      Icon={PhoneIcon}
      gaAction={gaAction + "-phone"}
    />
  );
}

function Email({ gaAction, email }) {
  if (!email) {
    return null;
  }
  return (
    <CustomLink
      primary={email}
      href={"mailto:" + email}
      Icon={EmailIcon}
      gaAction={gaAction + "-email"}
    />
  );
}

function Wikipedia({ gaAction, i18n, searchText }) {
  if (!searchText) {
    return null;
  }
  const href =
    "https://en.wikipedia.org/w/index.php?search=" +
    searchText.replaceAll(" ", "+");
  return (
    <CustomLink
      primary={i18n.t("Wikipedia")}
      href={href}
      Icon={TravelExploreIcon}
      gaAction={gaAction + "-wikipedia"}
    />
  );
}

function Parliament({ gaAction, i18n, id }) {
  const href = "https://www.parliament.lk/component/members/viewMember/" + id;
  return (
    <CustomLink
      primary={i18n.t("Parliament Website")}
      href={href}
      Icon={GavelIcon}
      gaAction={gaAction + "-parliamnent"}
    />
  );
}

function QualificationsWidget({ i18n, title, body }) {
  if (!body) {
    return null;
  }
  return (
    <Card sx={{ maxWidth: 275, margin: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {i18n.t(title + " Qualifications")}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
}

function ChipWidget({ i18n, content }) {
  if (!content) {
    return null;
  }
  if (content === "Other or Unknown") {
    return null;
  }
  if (content === "None") {
    return null;
  }
  return <Chip label={i18n.t(content)} variant="outlined" />;
}

export default function MPDrawerView(props) {
  const { mp, i18n } = props;
  if (!mp) {
    return null;
  }

  const gaAction = mp.id + "-" + mp.name;

  return (
    <Box sx={STYLE_BOX}>
      <Avatar alt={mp.name} src={mp.imageURL} sx={STYLE_AVATAR} />
      <Typography variant="h5" display="block">
        {i18n.t(mp.firstNames)}
      </Typography>
      <Typography variant="h3" display="block">
        {i18n.t(mp.lastName)}
      </Typography>
      <Typography variant="subtitle2" display="block">
        {i18n.t("Age") + " " + mp.ageFloor}
      </Typography>
      <Typography variant="overline" display="block">
        {i18n.t(mp.party)}
        {" - "}
        {i18n.t(mp.edName)}
      </Typography>

      <Stack direction="row" spacing={1}>
        <ChipWidget content={mp.profession} i18n={i18n} />
        <ChipWidget content={mp.civilStatus} i18n={i18n} />
        <ChipWidget content={mp.religion} i18n={i18n} />
      </Stack>

      <QualificationsWidget
        title="Academic"
        body={mp.academicQualifications}
        i18n={i18n}
      />
      <QualificationsWidget
        title="Professional"
        body={mp.professionalQualifications}
        i18n={i18n}
      />

      <List>
        <Phone
          phone={mp.phoneSitting}
          isSitting={true}
          i18n={i18n}
          gaAction={gaAction}
        />

        <Address
          address={mp.addressSitting}
          isSitting={true}
          i18n={i18n}
          gaAction={gaAction}
        />

        <Phone phone={mp.phone} i18n={i18n} gaAction={gaAction} />

        <Address
          address={mp.address}
          isSitting={false}
          i18n={i18n}
          gaAction={gaAction}
        />

        <Email email={mp.email} i18n={i18n} gaAction={gaAction} />

        <Parliament id={mp.id} i18n={i18n} gaAction={gaAction} />
        <Wikipedia searchText={mp.name} i18n={i18n} gaAction={gaAction} />
      </List>
    </Box>
  );
}
