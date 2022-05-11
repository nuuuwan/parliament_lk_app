import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";

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
          sx={{ width: avatarSize, height: avatarSize }}
        >
          {mp.initials}
        </Avatar>
      </Tooltip>
    </div>
  );
}
