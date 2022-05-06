import { Component } from "react";
import MP from "../../core/MP.js";
import MPWidget from "../../nonstate/molecules/MPWidget.js";

const MARGIN = 20;
const STYLE = {
  backgroundColor: "#f8f8f8",
  borderRadius: MARGIN,
  margin: MARGIN,
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

    const [width, height] = [
      window.innerWidth - MARGIN * 2,
      window.innerHeight - MARGIN * 2,
    ];

    const customStyle = {
      width,
      height,
    };

    return (
      <div style={{ ...STYLE, ...customStyle }}>
        {mpList.map(function (mp, iMp) {
          const key = `mp-${mp.urlNum}`;
          return <MPWidget key={key} mp={mp} />;
        })}
      </div>
    );
  }
}
