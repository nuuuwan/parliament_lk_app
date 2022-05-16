import React, { useState } from "react";
import ReactGA from "react-ga";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

export default function ThumbsWidget({ mp }) {
  const cacheKey = mp.logString + ":" + "Thumbs";
  function getThumbsValueFromStorage() {
    return localStorage.getItem(cacheKey);
  }

  function setThumbsValueToStorage(value) {
    localStorage.setItem(cacheKey, value);
    setThumbsValue(value);
  }
  const defaultThumbsValue = getThumbsValueFromStorage();

  const [thumbsValue, setThumbsValue] = useState(defaultThumbsValue);

  let colorUp = "gray";
  let colorDown = "gray";
  if (thumbsValue === "Up") {
    colorUp = "green";
    colorDown = "lightgray";
  } else if (thumbsValue === "Down") {
    colorUp = "lightgray";
    colorDown = "red";
  }

  function onClickThumbsUp() {
    ReactGA.event({
      category: "MPs",
      action: "Clicked Thumbs Up",
      label: mp.logString,
      value: 10,
    });
    setThumbsValueToStorage("Up");
  }

  function onClickThumbsDown() {
    ReactGA.event({
      category: "MPs",
      action: "Clicked Thumbs Down",
      label: mp.logString,
      value: 10,
    });
    setThumbsValueToStorage("Down");
  }

  return (
    <Stack direction="row" spacing={1}>
      <IconButton onClick={onClickThumbsUp} size="small">
        <ThumbUpOffAltIcon fontSize="inherit" sx={{ color: colorUp }} />
      </IconButton>
      <IconButton onClick={onClickThumbsDown} size="small">
        <ThumbDownOffAltIcon fontSize="inherit" sx={{ color: colorDown }} />
      </IconButton>
    </Stack>
  );
}
