import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";
import MathXFuture from "../../base/MathXFuture.js";
const COLOR_SWITCH_ON = "#1976D2";

function getHumanText(z) {
  const absZ = Math.abs(z);
  if (absZ < 2) {
    return "";
  }
  let directionStr = z > 0 ? "more" : "fewer";
  let magnitudeStr = absZ > 4 ? "Highly" : "";
  return directionStr + " Significantly " + magnitudeStr;
}

function getBoundsStr(meanCount, stdevCount) {
  const [lowerBound, upperBound] = [
    meanCount - stdevCount * 2,
    meanCount + stdevCount * 2,
  ];

  const [lowerBoundStr, upperBoundStr] = [lowerBound, upperBound].map((x) =>
    MathXFuture.round(x, 0.1)
  );

  if (lowerBound === upperBound) {
    return lowerBoundStr;
  }
  return lowerBoundStr + " - " + upperBoundStr;
}

export default function StatisticalTrendsBlurb({
  countXY,
  countX,
  countY,
  count,
}) {
  const [n, p] = [countXY, (countX * countY) / countXY / countXY];
  const meanCount = n * p;
  const stdevCount = Math.sqrt(n * p * (1 - p));
  const z = (count - meanCount) / stdevCount;
  const humanText = getHumanText(z);
  const boundsStr = getBoundsStr(meanCount, stdevCount);
  const zStr = MathXFuture.round(z, 0.1);
  return (
    <>
      <Typography variant="subtitle1" component="div" color={COLOR_SWITCH_ON}>
        {t(humanText)}
      </Typography>
      <Typography variant="caption" component="span" color={COLOR_SWITCH_ON}>
        {boundsStr}
      </Typography>
      <Typography variant="caption" component="span" color={COLOR_SWITCH_ON}>
        {` (z = ${zStr})`}
      </Typography>
    </>
  );
}
