import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {t} from "../../base/I18N.js";

function getAvatarSize([width, height]) {
  const area = width * height;
  return parseInt(Math.sqrt((area - 10_000) / 225) * 0.5);
}

export default function AvatarMP({mp, onClickMP}) {
  const onClickInner = function (e) {
    onClickMP(mp.id);
  };

  const avatar_size =  getAvatarSize([window.innerWidth, window.innerHeight]);

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
          sx={{ width: avatar_size, height: avatar_size }}
        >
          {mp.initials}
        </Avatar>
      </Tooltip>
    </div>
  );
}
