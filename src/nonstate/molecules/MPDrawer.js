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
import TitledChip from "./TitledChip.js";

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
        <TitledChip
          title="Highest Education Level"
          body={mp.academicHighestLevel}
        />
        <QualificationsBlurb body={mp.academicQualifications} />
        <QualificationsBlurb body={mp.professionalQualifications} />
      </MPDrawerGroup>
      <MPDrawerGroup name="Voting & Parliamentary Attandance">
        <TitledChip title="Voting for 20th Amendment" body={mp.vote20A} />
      </MPDrawerGroup>
      <MPDrawerGroup name="Transparency & Corruption">
        <TitledChip
          title="Has Publicly Declared Assets?"
          body={mp.hasDeclaredAssets}
        />
      </MPDrawerGroup>
      <MPDrawerGroup name="Demographics">
        <TitledChip
          title="Gender"
          body={mp.gender}
        />
        <TitledChip
          title="Age"
          body={mp.ageFloor}
        />
        <TitledChip
          title="Date of Birth"
          body={mp.dateOfBirth}
        />
        <TitledChip
          title="Generation"
          body={mp.generation}
        />
      </MPDrawerGroup>
      <MPDrawerGroup name="Electoral Regions">
        <ElectoralRegionBlurb mp={mp} />
      </MPDrawerGroup>
      <MPDrawerGroup name="Religion & Ethnicity" />
    </Box>
  );
}
