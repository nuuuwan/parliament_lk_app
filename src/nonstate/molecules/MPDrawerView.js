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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
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

function CustomLink({
  gaLabel,
  gaActionSuffix,
  primary,
  secondary,
  href,
  Icon,
}) {
  const onClick = function (e) {
    ReactGA.event({
      category: "External Links-Drawer",
      action: "Clicked Drawer-" + gaActionSuffix,
      label: gaLabel,
      value: 1,
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

function Address({ gaLabel, i18n, address, isSitting }) {
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
      gaActionSuffix="Address"
      gaLabel={gaLabel}
    />
  );
}

function Phone({ gaLabel, i18n, phone, isSitting }) {
  if (!phone) {
    return null;
  }
  return (
    <CustomLink
      primary={phone}
      secondary={getSittingText(i18n, isSitting)}
      href={"tel:" + phone}
      Icon={PhoneIcon}
      gaActionSuffix="Phone"
      gaLabel={gaLabel}
    />
  );
}

function Email({ gaLabel, email }) {
  if (!email) {
    return null;
  }
  return (
    <CustomLink
      primary={email}
      href={"mailto:" + email}
      Icon={EmailIcon}
      gaActionSuffix="Email"
      gaLabel={gaLabel}
    />
  );
}

function Wikipedia({ gaLabel, i18n, searchText }) {
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
      gaActionSuffix="Wikipedia"
      gaLabel={gaLabel}
    />
  );
}

function Parliament({ gaLabel, i18n, id }) {
  const href = "https://www.parliament.lk/component/members/viewMember/" + id;
  return (
    <CustomLink
      primary={i18n.t("Parliament Website")}
      href={href}
      Icon={GavelIcon}
      gaActionSuffix="Parliament"
      gaLabel={gaLabel}
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
  const { mp, i18n, onClose } = props;
  if (!mp) {
    return null;
  }

  const gaLabel = mp.logString;

  return (
    <Box sx={STYLE_BOX}>
      <Grid container justifyContent="flex-end">
        <IconButton aria-label="delete" size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Grid>

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
          gaLabel={gaLabel}
        />

        <Address
          address={mp.addressSitting}
          isSitting={true}
          i18n={i18n}
          gaLabel={gaLabel}
        />

        <Phone phone={mp.phone} i18n={i18n} gaLabel={gaLabel} />

        <Address
          address={mp.address}
          isSitting={false}
          i18n={i18n}
          gaLabel={gaLabel}
        />

        <Email email={mp.email} i18n={i18n} gaLabel={gaLabel} />

        <Parliament id={mp.id} i18n={i18n} gaLabel={gaLabel} />
        <Wikipedia searchText={mp.name} i18n={i18n} gaLabel={gaLabel} />
      </List>
    </Box>
  );
}
