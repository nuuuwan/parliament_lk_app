import { useState } from "react";
import ReactGA from "react-ga";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import GitHubIcon from "@mui/icons-material/GitHub";
import GavelIcon from "@mui/icons-material/Gavel";

import { t } from "../../base/I18N.js";

const MENU_ITEM_LIST = [
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
              {t(menuItem.name)}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
