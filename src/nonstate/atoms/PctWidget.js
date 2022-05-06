const STYLE = {
  whiteSpace: "nowrap",
  marginTop: 12,
};
const STYLE_N = {
  fontSize: 12,
  color: "gray",
  fontWeight: 300,
};

const STYLE_MPS = {
  fontSize: 9,
  color: "lightgray",
  fontWeight: 300,
};

const STYLE_P = {
  marginTop: 6,
  fontSize: 18,
  color: "gray",
  fontWeight: 600,
};

const STYLE_PP = {
  marginTop: 6,
  fontSize: 12,
  fontWeight: 300,
  marginLeft: 6,
};

function formatPct(p) {
  if (p === 0) {
    return "";
  }
  if (p > 0.1) {
    return parseInt(100 * p + 0.5) + "%";
  }
  return parseInt(1000 * p + 0.5) / 10 + "%";
}

function renderZ(z, mean, stdev) {
  let stylePPCustom = { color: "lightgray" };
  let label = parseInt(z * 10) / 10 + "σ";
  const lower = parseInt(mean - stdev * 2);
  const upper = parseInt(mean + stdev * 2);

  let expectedStr;
  if (lower === upper) {
    expectedStr = `${upper}`;
  } else {
    expectedStr = `[${lower} to ${upper}]`;
  }

  if (z > 2) {
    stylePPCustom.color = "green";
  } else if (z < -2) {
    stylePPCustom.color = "red";
  }
  return (
    <div style={{ ...STYLE_PP, ...stylePPCustom }}>
      {label} · 95%CI = {expectedStr}
    </div>
  );
}

export default function PctWidget(props) {
  const { count, countX, countY, xLabel, yLabel } = props;
  if (count === 0) {
    return null;
  }

  const labelMP = " MP" + (count === 1 ? "" : "s");
  const countXY = 225;

  let renderDetails = null;
  if (countX) {
    const pX = count / countX;
    const pY = count / countY;
    const p_X = countX / countXY;
    const p_Y = countY / countXY;

    const p = p_X * p_Y;
    const meanCount = countXY * p;
    const stdevCount = Math.sqrt(countXY * p * (1 - p));
    const zCount = (count - meanCount) / stdevCount;

    renderDetails = (
      <>
        {renderZ(zCount, meanCount, stdevCount)}
        <div>
          <div style={STYLE_P}>{formatPct(pX)}</div>
          <div style={STYLE_N}>{" of " + xLabel}</div>
        </div>
        <div>
          <div style={STYLE_P}>{formatPct(pY)}</div>
          <div style={STYLE_N}>{" of " + yLabel}</div>
        </div>
      </>
    );
  } else if (countXY) {
    const pXY = count / countXY;
    renderDetails = (
      <div>
        <span style={STYLE_P}>{formatPct(pXY)}</span>
      </div>
    );
  }

  return (
    <div style={STYLE}>
      <div>
        <span style={STYLE_N}>{count}</span>
        <span style={STYLE_MPS}>{labelMP}</span>
      </div>
      {renderDetails}
    </div>
  );
}
