import * as React from "react";

import Box from "@mui/material/Box";

import ProfileHeader from "./ProfileHeader.js";
import CloseButton from "../atoms/CloseButton.js";
import {DIM_GROUP_LIST} from '../../core/DimConstants.js';

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

      
    </Box>
  );
}
