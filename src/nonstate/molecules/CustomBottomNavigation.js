import ReactGA from "react-ga";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

import { t } from "../../base/I18N.js";

export default function CustomBottomNavigation({ onClickStatisticalTrends }) {
  const BOTTOM_NAVIGATION_ITEMS = [
    {
      name: "Statistical Trends",
      details: "Use Statistical Trends",
      Icon: LeaderboardIcon,
      onClick: onClickStatisticalTrends,
      gaCategory: "Statistical Trends",
      gaLabel: "Statistical Trends",
    },
  ];

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        {BOTTOM_NAVIGATION_ITEMS.map(function (item, i) {
          const key = "data-" + i;
          const onClick = function (e) {
            ReactGA.event({
              category: item.gaCategory,
              action: "Clicked Bottom Navigation Button",
              label: item.gaLabel,
              value: 10,
            });
            item.onClick();
          };
          const Icon = item.Icon;
          return (
            <Tooltip
              key={key}
              title={
                <Typography variant="subtitle1">{t(item.details)}</Typography>
              }
            >
              <BottomNavigationAction
                label={item.name}
                icon={<Icon />}
                onClick={onClick}
              />
            </Tooltip>
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}
