import React, { useContext } from "react";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { FormControl } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SelectMui from "../base/SelectMui";
import { PURPLE_023, PURPLE_075, PURPLE_100, WHITE_PRIMARY } from "../colors";
import { ROBOTO } from "../typography";
import { ProductContext } from "../util/Contexts";
import { breakDown } from "../breakpoints";

export const NAV_BAR_HEIGHT = 70;

const ProductSelectorWrapper = styled.div`
  margin: 0 20px;
  padding: 0 20px;
  width: 400px; // Same value as LEFT_SIDEBAR_WIDTH from ../../../app/components/layout/Layout.tsx

  @media (${breakDown("md")}) {
    width: 300px;
    margin: unset;
    padding: unset;
  }
`;

const NavBarWrapper = styled.div`
  display: flex;
  width: calc(100vw - 420px);
  padding-right: 2em;
`;

export type NavItemProps = {
  value: string;
  label: string;
  href: string;
};

export type SecondaryNavBarProps = {
  navItems: NavItemProps[];
};

export default function SecondaryNavBar({ navItems }: SecondaryNavBarProps) {
  const { selectedProduct, setSelectedProduct, productOptions } =
    useContext(ProductContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: WHITE_PRIMARY,
        boxShadow: "none",
        borderBottom: `1px solid ${PURPLE_023}`,
        height: NAV_BAR_HEIGHT,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-around" }}>
          <Box
            sx={{
              width: "300",
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="hamburger menu for nav items"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: "black",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="productSelector" onClick={handleCloseNavMenu}>
                <FormControl sx={{ m: 2, minWidth: 300 }} size="small">
                  <SelectMui
                    label="Select Product"
                    onChange={(value) => setSelectedProduct(value)}
                    options={productOptions}
                    value={selectedProduct.value}
                  />
                </FormControl>
              </MenuItem>
              {navItems.map((item) => (
                <MenuItem key={item.value} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              height: NAV_BAR_HEIGHT,
            }}
          >
            <ProductSelectorWrapper>
              <FormControl sx={{ m: 1, width: "100%" }} size="small">
                <SelectMui
                  label="Select Product"
                  onChange={(value) => setSelectedProduct(value)}
                  options={productOptions}
                  value={selectedProduct.value}
                />
              </FormControl>
            </ProductSelectorWrapper>

            <NavBarWrapper>
              {navItems.map((item) => (
                <NextLink href={item.href}>
                  <Button
                    key={item.value}
                    onClick={handleCloseNavMenu}
                    sx={{
                      color: PURPLE_075,
                      font: ROBOTO,
                      display: "block",
                      width: "10rem",
                      marginBottom: "unset",
                      borderRadius: "0px",
                      borderBottom: "2px solid transparent",
                      "&:hover": {
                        color: PURPLE_100,
                        borderBottom: `2px solid ${PURPLE_100}`,
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </NextLink>
              ))}
            </NavBarWrapper>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
