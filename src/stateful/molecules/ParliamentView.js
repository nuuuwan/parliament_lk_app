import { Component } from "react";
import MP from "../../core/MP.js";
import MPWidget from "../../nonstate/molecules/MPWidget.js";

const MARGIN = 20;
const STYLE = {
  position: "relative",
  backgroundColor: "#fcfcfc",
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

    const nX = Object.keys(categoryTompIds).length + 1;
    const nY = Object.values(categoryTompIds).reduce(function (nY, mpIds) {
      return Math.max(nY, mpIds.length);
    }, 0) + 1;

    const [xSpan, ySpan] = [width / nX, height / nY];
    const size = Math.min(xSpan, ySpan);

    const mpIdToQXY = Object.keys(categoryTompIds)
      .sort()
      .reduce(function (mpIdToQXY, category, iCategory) {
        const mpIds = categoryTompIds[category];
        return mpIds.reduce(function (mpIdToQXY, mpId, iMP) {
          mpIdToQXY[mpId] = [iCategory, iMP];
          return mpIdToQXY;
        }, mpIdToQXY);
      }, {});

    const customStyle = {
      width,
      height,
    };

    return (
      <div style={{ ...STYLE, ...customStyle }}>
        {
          Object.keys(categoryTompIds).sort().map(function(category, iCategory) {
            const [qx, qy] = [iCategory, -1];
            const [x, y] = [(qx + 1) * xSpan, (nY - qy - 1) * ySpan];

            const key = `div-x-label-${iCategory}`;
            const styleLabel = {
              position: 'absolute',
              left: x,
              top: 0,
              fontSize: xSpan / 5,
              textAlign: 'center',
              width: xSpan,
              height,
              backgroundColor: '#f8f8f8',
              borderColor: 'gray',
              borderStyle: 'solid',
              borderWidth: 1,
            }
            return (
              <div key={key} style={styleLabel}>{category}</div>
            )
          })
        }
        {Object.values(mpIdx).map(function (mp, iMp) {
          const key = `mp-${mp.urlNum}`;
          const [qx, qy] = mpIdToQXY[mp.id];
          const [x, y] = [(qx + 1 + 0.5) * xSpan, (nY - qy - 1) * ySpan];
          return <MPWidget key={key} mp={mp} x={x} y={y} size={size} />;
        })}
      </div>
    );
  }
}
