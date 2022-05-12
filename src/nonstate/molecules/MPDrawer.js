import * as React from "react";

import Box from "@mui/material/Box";

import CloseButton from "../atoms/CloseButton.js";
import QualificationsBlurb from "../atoms/QualificationsBlurb.js";
import MPDrawerGroup from "./MPDrawerGroup.js";
import ProfileHeader from "./ProfileHeader.js";
import ExternalLink from "./ExternalLink.js";
import TitledChip from "./TitledChip.js";

const STYLE_BOX = { padding: 3, maxWidth: "90%", margin: "auto" };

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
        <TitledChip title="Party" body={mp.party} />
      </MPDrawerGroup>
      <MPDrawerGroup name="Education & Profession">
        <TitledChip
          title="Highest Education Level"
          body={mp.academicHighestLevel}
        />
        <QualificationsBlurb body={mp.academicQualifications} />
        <TitledChip title="Stated Profession" body={mp.profession} />
        <QualificationsBlurb body={mp.professionalQualifications} />
      </MPDrawerGroup>
      <MPDrawerGroup name="Voting & Parliamentary Attandance">
        <TitledChip title="Voting for 20th Amendment" body={mp.vote20A} />
        <TitledChip
          title="Attandance 9th Parliament (2020 - )"
          body={mp.attendance9thPct}
        />
        <TitledChip
          title="Attandance 8th Parliament (2017 - 2020)"
          body={mp.attendance8thPct}
        />
      </MPDrawerGroup>
      <MPDrawerGroup name="Transparency & Corruption">
        <TitledChip
          title="Has Publicly Declared Assets?"
          body={mp.hasDeclaredAssets}
        />
      </MPDrawerGroup>
      <MPDrawerGroup name="Demographics">
        <TitledChip title="Gender" body={mp.gender} />
        <TitledChip title="Civil Status" body={mp.civilStatus} />

        <TitledChip title="Age" body={mp.ageFloor} />
        <TitledChip title="Date of Birth" body={mp.dateOfBirth} />
        <TitledChip title="Generation" body={mp.generation} />
      </MPDrawerGroup>
      <MPDrawerGroup name="Electoral Regions">
        <TitledChip title="Electoral District" body={mp.edName} titleAtBottom />
        <TitledChip title="Province" body={mp.provinceName} titleAtBottom />
      </MPDrawerGroup>
      <MPDrawerGroup name="Religion & Ethnicity">
        <TitledChip title="Religion" body={mp.religion} />
      </MPDrawerGroup>

      <MPDrawerGroup name="Contact Details">
        <ExternalLink title="Phone" mp={mp} />
        <ExternalLink title="Address" mp={mp} />
        <ExternalLink title="Phone Sitting" mp={mp} />
        <ExternalLink title="Address Sitting" mp={mp} />
        <ExternalLink title="Email" mp={mp} />
      </MPDrawerGroup>

      <MPDrawerGroup name="External References">
        <ExternalLink title="Parliament Website" mp={mp} />
        <ExternalLink title="Wikipedia" mp={mp} />
      </MPDrawerGroup>
    </Box>
  );
}
