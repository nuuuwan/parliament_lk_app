import ReactGA from "react-ga";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import GitHubIcon from "@mui/icons-material/GitHub";
import GavelIcon from "@mui/icons-material/Gavel";

import { t } from "../../base/I18N.js";

const BOTTOM_NAVIGATION_ITEMS = [
  {
    name: "@ParliamentLK",
    url:
      "https://www.parliament.lk/" +
      "en/members-of-parliament/directory-of-members/",
    details: "All data except asset declaration data is from www.parliament.lk",
    Icon: GavelIcon,
  },
  {
    name: "@TISriLanka",
    url: "https://www.tisrilanka.org/mpassets/",
    details: "Asset declaration data is from www.tisrilanka.org",
    Icon: TravelExploreIcon,
  },
  {
    name: "@nuuuwan",
    url: "http://github.com/nuuuwan",
    details: "Visualization, Design and App by @nuuuwan",
    Icon: GitHubIcon,
  },
];

export default function CustomBottomNavigation() {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        {BOTTOM_NAVIGATION_ITEMS.map(function (d, i) {
          const key = "data-" + i;
          const onClick = function (e) {
            ReactGA.event({
              category: "External Links",
              action: "Clicked Bottom Navigation Link",
              label: d.name,
              value: 1,
            });
            window.open(d.url, "_blank");
          };
          const Icon = d.Icon;
          return (
            <Tooltip
              key={key}
              title={
                <Typography variant="subtitle1">{t(d.details)}</Typography>
              }
            >
              <BottomNavigationAction
                label={d.name}
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
