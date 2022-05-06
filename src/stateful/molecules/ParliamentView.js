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

    const mpIdToXY = Object.keys(categoryTompIds)
      .sort()
      .reduce(function (mpIdToXY, category, iCategory) {
        const mpIds = categoryTompIds[category];
        const nMPs = mpIds.length;
        return mpIds.reduce(function (mpIdToXY, mpId, iMP) {
          mpIdToXY[mpId] = [
            iCategory * xSpan + MARGIN,
            height - (nMPs - iMP - 1) * ySpan + MARGIN,
          ];
          return mpIdToXY;
        }, mpIdToXY);
      }, {});
    const customStyle = {
      width,
      height,
    };

    return (
      <div style={{ ...STYLE, ...customStyle }}>
        {Object.values(mpIdx).map(function (mp, iMp) {
          const key = `mp-${mp.urlNum}`;
          const [x, y] = mpIdToXY[mp.id];
          return <MPWidget key={key} mp={mp} x={x} y={y} size={size} />;
        })}
      </div>
    );
  }
}
