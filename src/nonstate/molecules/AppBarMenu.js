import { useState } from "react";
import ReactGA from "react-ga";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import GitHubIcon from "@mui/icons-material/GitHub";
import GavelIcon from "@mui/icons-material/Gavel";
import HelpIcon from "@mui/icons-material/Help";

import { t } from "../../base/I18N.js";

const MENU_ITEM_LIST = [
  {
    name: "Help",
    url: "https://twitter.com/nuuuwan/status/1522912345256865795",
    details: "Help, Examples and Usage",
    Icon: HelpIcon,
  },
  {
    name: "Code",
    url: "http://github.com/nuuuwan",
    details: "Visualization, Design and App by @nuuuwan",
    Icon: GitHubIcon,
  },
  {
    name: "Data - The Parliament of Sri Lanka",
    url:
      "https://www.parliament.lk/" +
      "en/members-of-parliament/directory-of-members/",
    details: "All data except asset declaration data is from www.parliament.lk",
    Icon: GavelIcon,
  },
  {
    name: "Data - Transparency International - Sri Lanka",
    url: "https://www.tisrilanka.org/mpassets/",
    details: "Asset declaration data is from www.tisrilanka.org",
    Icon: TravelExploreIcon,
  },
];

export default function AppBarMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onClick = function (e) {
    setAnchorEl(e.currentTarget);
  };

  const onClose = function () {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={onClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {MENU_ITEM_LIST.map(function (menuItem, i) {
          const key = "app-bar-menu-item-" + i;
          const Icon = menuItem.Icon;
          const onClick = function (e) {
            ReactGA.event({
              category: "External Links",
              action: "Clicked App Bar Menu Link",
              label: menuItem.name,
              value: 1,
            });
            window.open(menuItem.url, "_blank");
            onClose();
          };

          return (
            <MenuItem key={key} onClick={onClick}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText>{t(menuItem.name)}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
