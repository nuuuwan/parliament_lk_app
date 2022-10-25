import React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import CloseButton from "../atoms/CloseButton.js";
import QualificationsBlurb from "../atoms/QualificationsBlurb.js";
import RefreshButton from "../atoms/RefreshButton.js";
import ExternalLink from "./ExternalLink.js";
import MPDrawerGroup from "./MPDrawerGroup.js";
import ProfileHeader from "./ProfileHeader.js";
import TitledChip from "./TitledChip.js";

const STYLE_BOX = {
  padding: 3,
};

const SHOW_ADDRESS = false;

export default function MPDrawer(props) {
  const { mp, isDrawerOpen, onClose, onRefresh } = props;
  if (!mp) {
    return null;
  }

  const width = window.innerWidth < 500 ? "90%" : "30%";

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: width },
      }}
    >
      <Box sx={STYLE_BOX}>
        <CloseButton onClose={onClose} />
        <RefreshButton onRefresh={onRefresh} />
        <ProfileHeader mp={mp} />

        <MPDrawerGroup name="Political Parties & Electoral Regions">
          <TitledChip title="Party" body={mp.party} />
          <TitledChip title="Electoral District" body={mp.edName} />

          {mp.edName === "National List" ? null : (
            <TitledChip title="Province" body={mp.provinceName} />
          )}
        </MPDrawerGroup>

        <MPDrawerGroup name="Voting & Parliamentary Attandance">
          <TitledChip title="Voting for 20th Amendment" body={mp.vote20A} />
          <TitledChip title="Voting for 22nd Amendment" body={mp.vote22A} />

          {mp.cabinet202205Data !== "NA" ? (
            <TitledChip
              title="2022 May Cabinet"
              body={mp.cabinet202205Data}
              disableTranslate
            />
          ) : null}

          {mp.cabinet202204Data !== "NA" ? (
            <TitledChip
              title="2022 April Cabinet"
              body={mp.cabinet202204Data}
              disableTranslate
            />
          ) : null}

          {mp.cabinet202008Data !== "NA" ? (
            <TitledChip
              title="2020 August Cabinet"
              body={mp.cabinet202008Data}
              disableTranslate
            />
          ) : null}

          {mp.cabinet201911Data !== "NA" ? (
            <TitledChip
              title="2019 November Cabinet"
              body={mp.cabinet201911Data}
              disableTranslate
            />
          ) : null}

          <TitledChip
            title="Attandance 9th Parliament (2020 - )"
            body={mp.attendance9thPct}
            disableTranslate
          />

          <TitledChip
            title="Attandance 8th Parliament (2017 - 2020)"
            body={mp.attendance8thPct}
            disableTranslate
          />
        </MPDrawerGroup>

        <MPDrawerGroup name="Transparency & Corruption">
          <TitledChip
            title="Has Publicly Declared Assets?"
            body={mp.hasDeclaredAssets}
          />
        </MPDrawerGroup>

        <MPDrawerGroup name="Education & Profession">
          <TitledChip
            title="Highest Education Level"
            body={mp.academicHighestLevel}
          />
          <TitledChip title="Stated Profession" body={mp.profession} />

          <QualificationsBlurb body={mp.academicQualifications} />
          <QualificationsBlurb body={mp.professionalQualifications} />
        </MPDrawerGroup>

        <MPDrawerGroup name="Demographics">
          <TitledChip title="Gender" body={mp.gender} />
          <TitledChip title="Civil Status" body={mp.civilStatus} />

          <TitledChip title="Age" body={mp.ageFloor} disableTranslate />
          <TitledChip
            title="Date of Birth"
            body={mp.dateOfBirth}
            disableTranslate
          />
          <TitledChip title="Generation" body={mp.generation} />
        </MPDrawerGroup>

        <MPDrawerGroup name="Religion & Ethnicity">
          <TitledChip title="Religion" body={mp.religion} />
        </MPDrawerGroup>

        <MPDrawerGroup name="Contact Details">
          <ExternalLink title="Phone" mp={mp} />
          {SHOW_ADDRESS ? (
            <ExternalLink title="Address" mp={mp} splitBody />
          ) : null}
          <ExternalLink title="Phone Sitting" mp={mp} />
          {SHOW_ADDRESS ? (
            <ExternalLink title="Address Sitting" mp={mp} splitBody />
          ) : null}
          <ExternalLink title="Email" mp={mp} />
        </MPDrawerGroup>

        <MPDrawerGroup name="External References">
          <ExternalLink title="Parliament Website" mp={mp} />
          <ExternalLink title="Wikipedia" mp={mp} />
        </MPDrawerGroup>
      </Box>
    </Drawer>
  );
}
