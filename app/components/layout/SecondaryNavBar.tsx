import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { FormControl } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SelectMui, { SelectMuiOption } from "../base/SelectMui";
import { PURPLE_023, PURPLE_075, PURPLE_100, WHITE_PRIMARY } from "../colors";
import { ROBOTO } from "../typography";
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

export type SecondaryNavBarProps = {
  navItems: SelectMuiOption[];
  selectedSecondaryNavItem: SelectMuiOption;
  setSelectedSecondaryNavItem: Function;
  productOptions: SelectMuiOption[];
  selectedProduct: SelectMuiOption;
  setSelectedProduct: Function;
};

export default function SecondaryNavBar({
  navItems,
  // selectedSecondaryNavItem, TODO: Update or remove this prop
  setSelectedSecondaryNavItem,
  productOptions,
  selectedProduct,
  setSelectedProduct,
}: SecondaryNavBarProps) {
  const router = useRouter();

  // TODO: Update or remove this useEffect block
  // useEffect(() => {
  //   // Update the route and page based on the selectedSecondaryNavItem
  //   if (selectedSecondaryNavItem && selectedProduct) {
  //     router.push(selectedSecondaryNavItem.href(selectedProduct?.value));
  //   }
  // }, [selectedSecondaryNavItem, selectedProduct]);

  useEffect(() => {
    // Find the corresponding nav item based on the current path
    const currentNavItem = navItems.find((item) =>
      router.asPath.startsWith(item.href(String(selectedProduct?.value)))
    );

    // Update selectedSecondaryNavItem based on the current path
    setSelectedSecondaryNavItem(currentNavItem || navItems[0]);
  }, [router.asPath, selectedProduct]);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: WHITE_PRIMARY,
        boxShadow: "none",
        borderBottom: `1px solid ${PURPLE_023}`,
        height: NAV_BAR_HEIGHT,
        display: { xs: "none", sm: "none", md: "none", lg: "flex" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-around" }}>
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
                  value={selectedProduct || ""}
                />
              </FormControl>
            </ProductSelectorWrapper>

            <NavBarWrapper>
              {navItems.map((item) => (
                <NextLink
                  key={item.label}
                  href={item.href(String(selectedProduct?.value))} // Generate href based on
                  // selectedProduct
                >
                  <Button
                    key={item.label}
                    onClick={() => {
                      setSelectedSecondaryNavItem(item);
                    }}
                    sx={{
                      font: ROBOTO,
                      display: "block",
                      width: "10rem",
                      marginBottom: "unset",
                      borderRadius: "0px",
                      color:
                        router.asPath ===
                        item.href(String(selectedProduct?.value))
                          ? PURPLE_100
                          : PURPLE_075,
                      /* eslint-disable no-nested-ternary */
                      borderBottom:
                        router.asPath ===
                        item.href(String(selectedProduct?.value))
                          ? `2px solid ${PURPLE_100}`
                          : router.asPath.startsWith(
                              `${item.href(String(selectedProduct?.value))}/`
                            )
                          ? `2px solid transparent`
                          : `2px solid transparent`,
                      /* eslint-enable no-nested-ternary */
                      "&:hover": {
                        color: PURPLE_100,
                        borderBottom: `2px solid ${PURPLE_100}`,
                      },
                      "&:focus": {
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
