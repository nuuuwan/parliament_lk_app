import { Component } from "react";
import MPListView from "../molecules/MPListView.js";
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Parliament of Sri Lanka</h1>
        <MPListView />
      </div>
    );
  }
}
