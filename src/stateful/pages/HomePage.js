import { Component } from "react";
import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { t } from "../../base/I18N.js";
import ParliamentView from "../molecules/ParliamentView.js";

const STYLE = {
  backgroundColor: "lightgray",
};

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <AppBar position="static" sx={STYLE}>
          <Toolbar variant="dense">
            <Typography variant="h6" component="div">
              {t("Parliament of Sri Lanka")}
            </Typography>
          </Toolbar>
        </AppBar>
        <ParliamentView />
      </div>
    );
  }
}
