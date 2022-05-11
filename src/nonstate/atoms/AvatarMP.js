import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";

const SIZE_MULT_ON_MOUSE_ENTER = 3;
function getInitialAvatarSize() {
  return window.innerWidth / 30;
}

export default function AvatarMP({ mp, onClickMP }) {
  const initialAvatarSize = getInitialAvatarSize();
  const [avatarSize, setAvatarSize] = useState(initialAvatarSize);

  const onClickInner = function (e) {
    onClickMP(mp.id);
  };

  const onMouseOver = function (e) {
    setAvatarSize(initialAvatarSize * SIZE_MULT_ON_MOUSE_ENTER);
  };

  const onMouseLeave = function (e) {
    setAvatarSize(initialAvatarSize);
  };

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
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          sx={{ width: avatarSize, height: avatarSize }}
        >
          {mp.initials}
        </Avatar>
      </Tooltip>
    </div>
  );
}
