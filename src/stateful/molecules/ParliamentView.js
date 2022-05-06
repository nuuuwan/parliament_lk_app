import { Component } from "react";
import MP from "../../core/MP.js";
import MPWidget from "../../nonstate/molecules/MPWidget.js";

const MARGIN = 20;
const STYLE = {
  backgroundColor: "#f8f8f8",
  borderRadius: MARGIN,
  margin: MARGIN,
};

function funcCategorizeMP(mp) {
  const Q = 10;
  const age = mp.age;
  const lower = Math.floor(age / Q) * Q;
  const upper = lower + Q;
  return `${lower} - ${upper}`;
}

export default class ParliamentView extends Component {
  constructor(props) {
    super(props);
    this.state = { mpIdx: undefined };
  }

  async componentDidMount() {
    const mpIdx = await MP.getMPIdx();
    this.setState({ mpIdx });
  }

  render() {
    const { mpIdx } = this.state;
    if (mpIdx === undefined) {
      return "Loading...";
    }

    const categoryTompIds = Object.values(mpIdx).reduce(function (categoryTompIds, mp) {
      const category = funcCategorizeMP(mp);
      if (!categoryTompIds[category]) {
        categoryTompIds[category] = [];
      }
      categoryTompIds[category].push(mp.id);
      return categoryTompIds;
    }, {});

    const nXCategories = Object.keys(categoryTompIds).length;

    const [width, height] = [
      window.innerWidth - MARGIN * 2,
      window.innerHeight - MARGIN * 2,
    ];

    const size = 100;
    const [innerWidth, innerHeight] = [width - size, height - size];

    function getRandomX() {
      return parseInt(Math.random() * innerWidth) + MARGIN + size / 2;
    }

    function getRandomY() {
      return parseInt(Math.random() * innerHeight) + MARGIN + size / 2;
    }

    const customStyle = {
      width,
      height,
    };

    return (
      <div style={{ ...STYLE, ...customStyle }}>
        {Object.values(mpIdx).map(function (mp, iMp) {
          const key = `mp-${mp.urlNum}`;
          return (
            <MPWidget
              key={key}
              mp={mp}
              x={getRandomX()}
              y={getRandomY()}
              size={size}
            />
          );
        })}
      </div>
    );
  }
}
