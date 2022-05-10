import * as React from "react";
import ReactGA from "react-ga";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import I18N, { LANG_INFO_LIST, t } from "../../base/I18N.js";
import { VERSION } from "../../constants/Constants.js";

const STYLE = {
  backgroundColor: "lightgray",
};

const STYLE_TITLE = {
  fontSize: "80%",
};

const STYLE_VERSION = {
  fontSize: "20%",
  flexGrow: 1,
  margin: 1,
  color: "ghost",
};

export default function CustomAppBar({ selectedLang, onSelectLang }) {
  return (
    <AppBar position="static" sx={STYLE}>
      <Toolbar variant="dense">
        <Typography component="div" sx={STYLE_TITLE}>
          {t("Parliament of Sri Lanka")}
        </Typography>
        <Typography sx={STYLE_VERSION}>{VERSION}</Typography>

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
