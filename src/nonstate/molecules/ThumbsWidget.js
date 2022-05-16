import React, { useState } from "react";
import ReactGA from "react-ga";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Tooltip from "@mui/material/Tooltip";

const COLOR_NONE_CHOSSEN = "#808080";
const COLOR_NOT_CHOSSEN = "#f0f0f0";

const THUMBS_OPTION_LIST = [
  {
    value: "Up",
    Icon: ThumbUpOffAltIcon,
    color: "#00534e",
    tooltip: "Approve",
  },
  {
    value: "Meh",
    Icon: QuestionMarkIcon,
    color: "#eb7400",
    tooltip: "Undecided",
  },
  {
    value: "Down",
    Icon: ThumbDownOffAltIcon,
    color: "#8d153a",
    tooltip: "Disapprove",
  },
];

export default function ThumbsWidget({ mp }) {
  const cacheKey = mp.logString + ":Thumbs";
  function getThumbsValueFromStorage() {
    return localStorage.getItem(cacheKey);
  }

  function setThumbsValueToStorage(value) {
    localStorage.setItem(cacheKey, value);
    setThumbsValue(value);
  }
  const defaultThumbsValue = getThumbsValueFromStorage();

  const [thumbsValue, setThumbsValue] = useState(defaultThumbsValue);

  return (
    <Stack direction="row" spacing={1}>
      {THUMBS_OPTION_LIST.map(function (info, i) {
        const value = info.value;
        const Icon = info.Icon;
        const color =
          thumbsValue === value
            ? info.color
            : defaultThumbsValue
            ? COLOR_NOT_CHOSSEN
            : COLOR_NONE_CHOSSEN;
        function onClick(e) {
          ReactGA.event({
            category: "MPs",
            action: "Clicked Thumbs " + value,
            label: mp.logString,
            value: 10,
          });
          setThumbsValueToStorage(value);
        }
        const key = "thumb-option-" + i;
        return (
          <Tooltip key={key} title={info.tooltip}>
            <IconButton onClick={onClick} size="small">
              <Icon fontSize="inherit" sx={{ color: color }} />
            </IconButton>
          </Tooltip>
        );
      })}
    </Stack>
  );
}
