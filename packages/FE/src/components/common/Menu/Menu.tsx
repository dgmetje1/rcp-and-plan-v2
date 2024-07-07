import { forwardRef, PropsWithChildren, useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import logo from "@/assets/Logo.svg";
import Tabs, { Tab, TabContent, TabsHeader } from "@/components/common/Tabs";
import { useAuthContext } from "@/context/Auth";

import { MenuProps } from "./types";

const Menu = forwardRef<HTMLDivElement, PropsWithChildren<MenuProps>>(
  ({ children, defaultTab, open, toggleMenu, drawerProps }, ref) => {
    const { t } = useTranslation();
    const { account } = useAuthContext();

    const regularLinks = useMemo(
      () => (
        <>
          <Link onClick={toggleMenu(false)} to="/">
            {t("menu.sidebar.home")}
          </Link>
          <Link onClick={toggleMenu(false)} to="/plans">
            {t("menu.sidebar.plans")}
          </Link>
          <Link onClick={toggleMenu(false)} to="/purchase-list">
            {t("menu.sidebar.purchase_list")}
          </Link>
        </>
      ),
      [t, toggleMenu],
    );

    return (
      <Drawer anchor="left" onClose={toggleMenu(false)} open={open} {...drawerProps} PaperProps={{ ref: ref }}>
        <Box display="flex" justifyContent="center" m={2} mb={4}>
          <img alt="logo Rcp & Plan" height={75} src={logo} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          role="presentation"
          sx={{
            minWidth: 250,
            px: 3,
            rowGap: 1,
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: 1.25,
            " a:hover": { color: "primary.main" },
            " a.active": { color: "primary.dark", fontWeight: 700 },
          }}
        >
          {account ? (
            <Tabs defaultIndex={defaultTab}>
              <TabsHeader>
                <Tab label={t("menu.sidebar.tabs.application")} sx={{ textTransform: "none", fontSize: "1.15rem" }} />
                <Tab label={t("menu.sidebar.tabs.management")} sx={{ textTransform: "none", fontSize: "1.15rem" }} />
              </TabsHeader>
              <TabContent contentIndex={0} display="flex" flexDirection="column" rowGap={2}>
                {regularLinks}
              </TabContent>
              <TabContent contentIndex={1} display="flex" flexDirection="column" rowGap={2}>
                <Link activeOptions={{ exact: true }} onClick={toggleMenu(false)} to="/management">
                  {t("menu.sidebar.management")}
                </Link>
                <Link onClick={toggleMenu(false)} to="/management/units">
                  {t("menu.sidebar.units")}
                </Link>
              </TabContent>
            </Tabs>
          ) : (
            regularLinks
          )}
        </Box>
        {children}
      </Drawer>
    );
  },
);

export default Menu;
