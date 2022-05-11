import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { t } from "../../base/I18N.js";

const COLOR_SWITCH_ON = "#1976D2";

const TITLE_TEXT = "What are Statistical Trends?";
const INFO_TEXT_LIST_LIST = [
  [
    "Statistical Trends measure if certain grid cells contain more MPs than",
    "we would expect if they were assigned at random.",
  ],
  [
    "The 'z' (e.g. z = 2.5) value shows how many standard deviations",
    "the number of MPs vary from the mean number of expected MPs.",
  ],
  [
    "The range (e.g. 84 - 114) is the 95% confidence interval for the",
    "number of MPs. If the actual number is outside this range,",
    "the probability that the trend is random is <5%.",
  ],
];

export default function StatisticalTrendsSwitch({
  showStatisticalTrends,
  onClickStatisticalTrends,
}) {
  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={showStatisticalTrends}
            onClick={onClickStatisticalTrends}
          />
        }
        label={
          <Typography
            variant="subtitle2"
            color={showStatisticalTrends ? COLOR_SWITCH_ON : "gray"}
          >
            {t("Statistical Trends")}
          </Typography>
        }
        sx={{ marginLeft: 1 }}
      />

      {showStatisticalTrends ? (
        <Stack sx={{ maxWidth: 700 }} margin={2}>
          <Alert severity="info">
            <AlertTitle>{t(TITLE_TEXT)}</AlertTitle>
            {INFO_TEXT_LIST_LIST.map(function (infoTextList, i) {
              const infoText = infoTextList.join(" ");
              const key = "p-info-text-" + i;
              return <p key={key}>{t(infoText)}</p>;
            })}
          </Alert>
        </Stack>
      ) : null}
    </div>
  );
}
