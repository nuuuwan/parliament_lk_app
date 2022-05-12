import * as React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { t } from "../../base/I18N.js";
import CloseButton from "../atoms/CloseButton.js";
import PartyBlurb from "../atoms/PartyBlurb.js";
import ElectoralRegionBlurb from "../atoms/ElectoralRegionBlurb.js";
import QualificationsBlurb from "../atoms/QualificationsBlurb.js";
import MPDrawerGroup from "./MPDrawerGroup.js";
import ProfileHeader from "./ProfileHeader.js";

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

      <MPDrawerGroup name="Political Parties">
        <PartyBlurb mp={mp} />
      </MPDrawerGroup>
      <MPDrawerGroup name="Education & Profession">
        <Chip label={t(mp.academicHighestLevel)} />
        <QualificationsBlurb body={mp.academicQualifications} />
        <QualificationsBlurb body={mp.professionalQualifications} />
      </MPDrawerGroup>
      <MPDrawerGroup name="Voting & Parliamentary Attandance" />
      <MPDrawerGroup name="Transparency & Corruption">
        <Chip label={t("Assets - " + mp.hasDeclaredAssets)} />
      </MPDrawerGroup>
      <MPDrawerGroup name="Demographics" />
      <MPDrawerGroup name="Electoral Regions">
        <ElectoralRegionBlurb mp={mp} />
      </MPDrawerGroup>
      <MPDrawerGroup name="Religion & Ethnicity" />
    </Box>
  );
}
