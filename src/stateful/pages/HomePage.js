import { Component } from "react";
import * as React from "react";
import ReactGA from "react-ga";

import ParliamentPage from "./ParliamentPage.js";

export default class HomePage extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    const {selectedLang, activeMPId, xDim, yDim} = this.props;
    return (
      <div>
        <ParliamentPage
          selectedLang={selectedLang}
          activeMPId={activeMPId}
          xDim={xDim}
          yDim={yDim}
        />
      </div>
    );
  }
}
