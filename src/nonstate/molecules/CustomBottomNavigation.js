import React from "react";
import ReactGA from "react-ga";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CasinoIcon from "@mui/icons-material/Casino";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import UndoIcon from "@mui/icons-material/Undo";

import { t } from "../../base/I18N.js";

export default function CustomBottomNavigation({
  onClickUndo,
  onClickStatisticalTrends,
  onClickShowRandomMP,
}) {
  const BOTTOM_NAVIGATION_ITEMS = [
    {
      name: "Undo",
      details: "Undo last action",
      Icon: UndoIcon,
      onClick: onClickUndo,
      gaCategory: "History",
      gaLabel: "Undo",
    },
    {
      name: "Statistical Trends",
      details: "Use Statistical Trends",
      Icon: LeaderboardIcon,
      onClick: onClickStatisticalTrends,
      gaCategory: "Statistical Trends",
      gaLabel: "Statistical Trends",
    },
    {
      name: "Random MP",
      details: "Show Random MP",
      Icon: CasinoIcon,
      onClick: onClickShowRandomMP,
      gaCategory: "MPs",
      gaLabel: "Show Random",
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
                label={t(item.name)}
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
