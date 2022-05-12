import { Component } from "react";
import * as React from "react";
import ReactGA from "react-ga";

import ParliamentView from "../molecules/ParliamentView.js";

export default class HomePage extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <div>
        <ParliamentView />
      </div>
    );
  }
}
