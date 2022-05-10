import * as React from "react";
import ReactGA from "react-ga";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import  I18N, {LANG_TO_LABEL, t} from "../../base/I18N.js";

const STYLE = {
  backgroundColor: "lightgray",
};

export default function CustomAppBar({selectedLang, onSelectLang}) {

  return (
    <AppBar position="static" sx={STYLE}>
      <Toolbar variant="dense">
        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
          {t("Parliament of Sri Lanka")}
        </Typography>

        {Object.entries(LANG_TO_LABEL).map(
          function ([lang, label]) {
            const key = "button-" + lang;
            const color = selectedLang === lang ? "white" : "gray";

            const onClick = function (e) {
              I18N.setLang(lang);
              ReactGA.event({
                category: "Internationalization",
                action: "Clicked Language",
                label: lang,
                value: 10,
              });
              onSelectLang(lang)
            };

            return (
              <Button
                key={key}
                sx={{ color: color, padding: 0}}
                onClick={onClick}
              >
                {label}
              </Button>
            );
          }
        )}
      </Toolbar>
    </AppBar>
  );
}
