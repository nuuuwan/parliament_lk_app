import React from "react";
import ReactGA from "react-ga";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBarMenu from "./AppBarMenu.js";
import MPSelector from "../../nonstate/atoms/MPSelector.js";

import I18N, { LANG_INFO_LIST, t } from "../../base/I18N.js";

const STYLE = {
  backgroundColor: "lightgray",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 50,
};

export default function CustomAppBar({
  mpIdx,
  activeMPId,
  selectedLang,
  onSelectLang,
  onSelectMP,
}) {
  return (
    <AppBar sx={STYLE}>
      <Toolbar variant="dense">
        <AppBarMenu />

        <MPSelector
          mpIdx={mpIdx}
          activeMPId={activeMPId}
          onSelectMP={onSelectMP}
        />

        <Typography component="div" sx={{ flexGrow: 1 }}>
          {t("")}
        </Typography>

        {LANG_INFO_LIST.map(function ([lang, label, color]) {
          const key = "button-" + lang;
          const opacity = selectedLang === lang ? 1 : 0.2;

          const onClick = function (e) {
            I18N.setLang(lang);
            ReactGA.event({
              category: "Internationalization",
              action: "Clicked Language",
              label: lang,
              value: 10,
            });
            onSelectLang(lang);
          };

          return (
            <Button
              key={key}
              sx={{
                color: color,
                minHeight: 0,
                minWidth: 0,
                padding: 1,
                opacity: opacity,
              }}
              onClick={onClick}
            >
              {label}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
}
