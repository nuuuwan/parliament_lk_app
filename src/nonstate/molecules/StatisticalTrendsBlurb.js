import Typography from "@mui/material/Typography";
import { t } from "../../base/I18N.js";

const COLOR_SWITCH_ON = "#1976D2";

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
  const absZ = Math.abs(z);
  let humanText = "";

  if (absZ > 1) {
    if (z >= 4) {
      humanText = "Highly significantly more";
    } else if (z <= -4) {
      humanText = "Highly significantly fewer";
    } else if (z >= 2) {
      humanText = "Significantly more";
    } else if (z <= -2) {
      humanText = "Significantly fewer";
    } else if (z >= 1) {
      humanText = "Slightly more";
    } else if (z <= -1) {
      humanText = "Slightly fewer";
    }
  }

  const lowerCount = parseInt((meanCount - stdevCount * 2) * 10 + 0.5) / 10;
  const upperCount = parseInt((meanCount + stdevCount * 2) * 10 + 0.5) / 10;

  let lowHighStr = `${lowerCount} - ${upperCount}`;
  if (lowerCount === upperCount) {
    lowHighStr = `${lowerCount}`;
  }

  const zStr = parseInt(z * 10 + 0.5) / 10;
  return (
    <>
      <Typography variant="subtitle1" component="div" color={COLOR_SWITCH_ON}>
        {t(humanText)}
      </Typography>
      <Typography variant="caption" component="span" color={COLOR_SWITCH_ON}>
        {lowHighStr}
      </Typography>
      <Typography variant="caption" component="span" color={COLOR_SWITCH_ON}>
        {` (z = ${zStr})`}
      </Typography>
    </>
  );
}
