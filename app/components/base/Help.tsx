import React, { useState } from "react";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import styled from "@emotion/styled";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { PURPLE_054, WHITE_PRIMARY } from "../colors";
import { BOX_SHADOW_8 } from "../shadowDepths";

const StyledHelpContainer = styled.div`
  position: relative;
`;

const StyledMenu = styled.div`
  position: absolute;
  top: 36px;
  right: -10px;
  width: max-content;
  background: ${WHITE_PRIMARY};
  box-shadow: ${BOX_SHADOW_8};
  border-radius: 4px;
`;

type LinkProps = { text: string; href: string };
type Props = { links: LinkProps[] };

function Help({ links }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <StyledHelpContainer>
        <IconButton
          aria-label="help"
          onClick={() => setExpanded(!expanded)}
          onBlur={() => setExpanded(false)}
        >
          <HelpOutlineRoundedIcon sx={{ color: PURPLE_054 }} />
        </IconButton>
        {expanded && (
          <StyledMenu>
            <List role="toolbar" aria-orientation="vertical">
              {links.map((link) => (
                <ListItem key={link.text} disablePadding>
                  <ListItemButton href={link.href} target="_blank">
                    <ListItemText primary={link.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </StyledMenu>
        )}
      </StyledHelpContainer>
    </div>
  );
}

export default Help;
