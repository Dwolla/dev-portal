import React from "react";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PURPLE_054 } from "../colors";

type LinkProps = { text: string; href: string };
type Props = { links: LinkProps[] };

function Help({ links }: Props) {
  // Menu implementation details on MUI's docs - https://mui.com/material-ui/react-menu/#basic-menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <HelpOutlineRoundedIcon sx={{ color: PURPLE_054 }} />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          // Positioning of <Menu> using MUI's Popover
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {links.map((link) => (
            <MenuItem
              key={link.text}
              onClick={handleClose}
              component="a"
              href={link.href}
              target="_blank"
            >
              {link.text}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}

export default Help;
