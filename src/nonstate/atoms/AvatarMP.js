import React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";
import { PARTY_IDX } from "../../core/Party.js";

const AVATAR_SIZE_MULT_IF_ACTIVE = 3;
function getInitialAvatarSize() {
  return window.innerWidth / 30;
}

export default function AvatarMP({ mp, onClickMP, isActiveMP }) {
  const baseAvatarSize = getInitialAvatarSize();
  const avatarSize =
    baseAvatarSize * (isActiveMP ? AVATAR_SIZE_MULT_IF_ACTIVE : 1);

  const onClickInner = function (e) {
    onClickMP(mp.id);
  };

  const color = PARTY_IDX[mp.party];

  return (
    <div>
      <Tooltip
        title={
          <>
            <Typography variant="subtitle1">{t(mp.name)}</Typography>
            <Typography variant="overline" display="block">
              {t(mp.party)}
              {" - "}
              {t(mp.edName)}
            </Typography>
          </>
        }
      >
        <Avatar
          alt={mp.name}
          src={mp.imageURL}
          onClick={onClickInner}
          sx={{
            width: avatarSize,
            height: avatarSize,
            borderColor: color,
            borderWidth: avatarSize / 10,
            borderStyle: "solid",
          }}
        >
          {mp.initials}
        </Avatar>
      </Tooltip>
    </div>
  );
}
