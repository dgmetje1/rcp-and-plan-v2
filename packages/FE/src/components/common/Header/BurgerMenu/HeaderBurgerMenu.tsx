import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import Menu from "@/components/common/Menu";
import { Api } from "@/lib/api";
import { queryClient } from "@/lib/core/queryClient";
import { Language, languages } from "@/types/user";

const HeaderBurgerMenu = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const toggleMenu = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const currentLanguage = i18n.language;

  const onChangeLanguage = (language: Language) => {
    if (currentLanguage === language) return;

    i18n.changeLanguage(language);
    Api.setLanguage(language);
    queryClient.invalidateQueries();
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="menu" color="inherit" edge="start" onClick={toggleMenu(true)} sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Menu defaultTab={0} open={open} toggleMenu={toggleMenu}>
        <Box display="flex" justifyContent="space-evenly" m={2} mt={3}>
          {languages.map(language => (
            <Button
              color={currentLanguage === language ? "primary" : "darkGrey"}
              key={language}
              onClick={() => onChangeLanguage(language)}
              sx={{ fontWeight: 600 }}
            >
              {language}
            </Button>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default HeaderBurgerMenu;
