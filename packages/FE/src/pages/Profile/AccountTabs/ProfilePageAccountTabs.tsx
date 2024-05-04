import { Divider } from "@mui/material";
import { t } from "i18next";

import Tabs, { Tab, TabContent, TabsHeader } from "@/components/common/Tabs";

import ProfilePageAccountTabsDetailsTab from "./tabs/Details";

const ProfilePageAccountTabs = () => {
  return (
    <Tabs>
      <TabsHeader>
        <Tab label={t("pages.profile.tabs.details")} />
        <Tab label={t("pages.profile.tabs.recipes")} />
      </TabsHeader>
      <Divider />
      <TabContent contentIndex={0}>
        <ProfilePageAccountTabsDetailsTab />
      </TabContent>
      <TabContent contentIndex={1}>Recipes</TabContent>
    </Tabs>
  );
};

export default ProfilePageAccountTabs;
