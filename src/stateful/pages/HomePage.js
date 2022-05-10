import { Component } from "react";
import * as React from "react";
import ReactGA from "react-ga";

import  I18N  from "../../base/I18N.js";
import CustomAppBar from "../../nonstate/molecules/CustomAppBar.js";
import ParliamentView from "../molecules/ParliamentView.js";

const DEFAULT_LANG = "en";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    let selectedLang = I18N.getLang();
    if (!selectedLang) {
      selectedLang = DEFAULT_LANG;
    }

    this.state = { selectedLang };
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  onSelectLang(selectedLang) {
    this.setState({selectedLang})
  }

  render() {
    const { selectedLang } = this.state;
    return (
      <div>
        <CustomAppBar
          selectedLang={selectedLang}
          onSelectLang={this.onSelectLang.bind(this)}
        />
        <ParliamentView />
      </div>
    );
  }
}
