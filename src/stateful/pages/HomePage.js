import { Component } from "react";
import * as React from "react";
import ReactGA from "react-ga";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import  I18N, {LANG_TO_LABEL, t} from "../../base/I18N.js";
import ParliamentView from "../molecules/ParliamentView.js";

const STYLE = {
  backgroundColor: "lightgray",
};
const DEFAULT_LANG = "en";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedLang: DEFAULT_LANG };
    I18N.getLang(DEFAULT_LANG);
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    const { selectedLang } = this.state;
    return (
      <div>
        <AppBar position="static" sx={STYLE}>
          <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
                  this.setState({ selectedLang: lang });
                }.bind(this);

                return (
                  <Button key={key} sx={{ color: color }} onClick={onClick}>
                    {label}
                  </Button>
                );
              }.bind(this)
            )}
          </Toolbar>
        </AppBar>
        <ParliamentView />
      </div>
    );
  }
}
