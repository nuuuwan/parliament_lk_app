import * as React from "react";

import Box from "@mui/material/Box";

import ProfileHeader from "./ProfileHeader.js";
import CloseButton from "../atoms/CloseButton.js";
import MPDrawerGroup from "./MPDrawerGroup.js";

const STYLE_BOX = { padding: 3, maxWidth: "75%" };

export default function MPDrawer(props) {
  const { mp, onClose } = props;
  if (!mp) {
    return null;
  }

  return (
    <Box sx={STYLE_BOX}>
      <CloseButton onClose={onClose} />
      <ProfileHeader mp={mp} />

      <MPDrawerGroup name="Political Parties" />
      <MPDrawerGroup name="Education & Profession" />
      <MPDrawerGroup name="Voting & Parliamentary Attandance" />
      <MPDrawerGroup name="Transparency & Corruption" />
      <MPDrawerGroup name="Demographics" />
      <MPDrawerGroup name="Electoral Regions" />
      <MPDrawerGroup name="Religion & Ethnicity" />
    </Box>
  );
}