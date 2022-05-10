import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {t} from "../../base/I18N.js";
const AVATAR_SIZE = 36;

export default function AvatarMP({mp, onClickMP}) {
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
          sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
        >
          {mp.initials}
        </Avatar>
      </Tooltip>
    </div>
  );
}
