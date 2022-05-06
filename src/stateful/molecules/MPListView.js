import { Component } from "react";
import MP from "../../core/MP.js";
import MPWidget from "../../nonstate/molecules/MPWidget.js";

const STYLE = {
  height: 200,
  backgroundColor: "#f8f8f8",
};

export default class MPListView extends Component {
  constructor(props) {
    super(props);
    this.state = { mpList: undefined };
  }

  async componentDidMount() {
    const mpList = await MP.getAll();
    this.setState({ mpList });
  }

  render() {
    const { mpList } = this.state;
    if (mpList === undefined) {
      return "Loading...";
    }

    return (
      <div style={STYLE}>
        {mpList.map(function (mp, iMp) {
          const key = `mp-${mp.urlNum}`;
          return <MPWidget key={key} mp={mp} />;
        })}
      </div>
    );
  }
}
