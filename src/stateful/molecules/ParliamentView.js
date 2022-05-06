import { Component } from "react";
import MP from "../../core/MP.js";
import MPWidget from "../../nonstate/molecules/MPWidget.js";

const MARGIN = 20;
const STYLE = {
  position: "relative",
  backgroundColor: "#f0f0f8",
  borderRadius: MARGIN,
  margin: MARGIN,
};

function funcCategorizeMP(mp) {
  const Q = 2;
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

    const [width, height] = [
      window.innerWidth - MARGIN * 2,
      window.innerHeight - MARGIN * 2,
    ];

    const categoryTompIds = Object.values(mpIdx)
      .sort(function (mpA, mpB) {
        return mpA.age - mpB.age;
      })
      .reduce(function (categoryTompIds, mp) {
        const category = funcCategorizeMP(mp);
        if (!categoryTompIds[category]) {
          categoryTompIds[category] = [];
        }
        categoryTompIds[category].push(mp.id);
        return categoryTompIds;
      }, {});

    const nX = Object.keys(categoryTompIds).length;
    const nY = Object.values(categoryTompIds).reduce(function (nY, mpIds) {
      return Math.max(nY, mpIds.length);
    }, 0);

    const [xSpan, ySpan] = [width / nX, height / nY];
    const size = Math.min(xSpan, ySpan);
    const [innerWidth, innerHeight] = [width - size, height - size];

    const mpIdToPXY = Object.keys(categoryTompIds)
      .sort()
      .reduce(function (mpIdToPXY, category, iCategory) {
        const mpIds = categoryTompIds[category];
        return mpIds.reduce(function (mpIdToPXY, mpId, iMP) {
          mpIdToPXY[mpId] = [iCategory / nX, iMP / nY];
          return mpIdToPXY;
        }, mpIdToPXY);
      }, {});

    const customStyle = {
      width,
      height,
    };

    return (
      <div style={{ ...STYLE, ...customStyle }}>
        {Object.values(mpIdx).map(function (mp, iMp) {
          const key = `mp-${mp.urlNum}`;
          const [px, py] = mpIdToPXY[mp.id];
          const [x, y] = [px * innerWidth + size, (1 - py) * innerHeight];
          return <MPWidget key={key} mp={mp} x={x} y={y} size={size} />;
        })}
      </div>
    );
  }
}
