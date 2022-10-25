import React from "react";
import ReactGA from "react-ga";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import GavelIcon from "@mui/icons-material/Gavel";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import { StringX } from "@nuuuwan/utils-js-dev";

import { t } from "../../base/I18N.js";

import { STYLE_TITLE, STYLE_BODY } from "./ChipOuter.js";

const GMAPS_PREFIX = "https://www.google.com/maps/search/";
const WIKIPEDIA_PREFIX = "https://en.wikipedia.org/w/index.php?search=";
const PARLIAMENT_WEBSITE_PREFIX =
  "https://www.parliament.lk/component/members/viewMember/";

function encodeURL(s) {
  return s.replaceAll(" ", "+").replace("/", "+");
}

const TITLE_TO_FUNC_HREF = {
  Phone: (mp) => "tel:" + mp.phone,
  Address: (mp) => GMAPS_PREFIX + encodeURL(mp.address),
  "Phone Sitting": (mp) => "tel:" + mp.phoneSitting,
  "Address Sitting": (mp) => GMAPS_PREFIX + encodeURL(mp.addressSitting),
  Email: (mp) => "mailto:" + mp.email,
  Wikipedia: (mp) => WIKIPEDIA_PREFIX + encodeURL(mp.name),
  "Parliament Website": (mp) => PARLIAMENT_WEBSITE_PREFIX + mp.id,
};

const TITLE_TO_FUNC_BODY = {
  Phone: (mp) => mp.phone,
  Address: (mp) => mp.address,
  "Phone Sitting": (mp) => mp.phoneSitting,
  "Address Sitting": (mp) => mp.addressSitting,
  Email: (mp) => mp.email,
  Wikipedia: (mp) => t("Profile Article"),
  "Parliament Website": (mp) => t("Profile Page"),
};

const FIELD_NAME_TO_ICON = {
  Phone: PhoneIcon,
  Address: HomeIcon,
  "Phone Sitting": PhoneIcon,
  "Address Sitting": HomeIcon,
  Email: EmailIcon,
  Wikipedia: TravelExploreIcon,
  "Parliament Website": GavelIcon,
};

export default function ExternalLink({ title, mp, splitBody }) {
  const funcBody = TITLE_TO_FUNC_BODY[title];
  const body = funcBody(mp);
  if (!body) {
    return null;
  }

  const funcHref = TITLE_TO_FUNC_HREF[title];
  const href = funcHref(mp);

  const onClick = function (e) {
    ReactGA.event({
      category: "MPs-External Links",
      action: "Clicked Drawer-" + mp.logString,
      label: title,
      value: 1,
    });
    window.open(href, "_blank");
  };

  const Icon = FIELD_NAME_TO_ICON[title];

  const primaryText = splitBody
    ? body.split(",").map(function (line, i) {
        const key = "external-list-" + title + "-" + i;
        return <div key={key}>{StringX.toTitleCase(line)}</div>;
      })
    : body;

  return (
    <ListItem disablePadding>
      <ListItemButton component="a" onClick={onClick}>
        <ListItemIcon>
          <Icon color="disabled" sx={{ fontSize: "normal" }} />
        </ListItemIcon>
        <ListItemText
          primary={<Typography sx={STYLE_BODY}>{primaryText}</Typography>}
          secondary={<Typography sx={STYLE_TITLE}>{t(title)}</Typography>}
        />
      </ListItemButton>
    </ListItem>
  );
}
