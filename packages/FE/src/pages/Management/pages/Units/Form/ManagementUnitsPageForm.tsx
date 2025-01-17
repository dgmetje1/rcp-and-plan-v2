import { Fragment, useMemo, useState } from "react";
import { Box, Button, Grow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import Form, { FormTextField } from "@/components/common/Form";
import FormCheckbox from "@/components/common/Form/Checkbox";
import { useCreateUnit, useEditUnit, useSuspenseGetUnits } from "@/queries/units";
import { UnitCreateDTO } from "@/types/unit";
import { languages } from "@/types/user";

import { useManagementItemsPageContext } from "../../../context/ManagementItemsPage";

const ManagementUnitsPageForm = () => {
  const { t } = useTranslation();

  const {
    selectedItem: selectedUnit,
    setSelectedItem,
    isFormOpen,
    toggleFormOpen,
    closeForm,
  } = useManagementItemsPageContext();
  const [isFormMounted, setIsFormMounted] = useState(isFormOpen);

  const { data } = useSuspenseGetUnits();

  const defaultValues = useMemo(() => {
    const selectedUnitInfo = data.find(unit => unit.id === selectedUnit);

    return selectedUnitInfo
      ? selectedUnitInfo
      : {
          isVisible: true,
          content: languages.reduce(
            (prev, lang) => ({ ...prev, [lang]: { name: "", singularName: "", shortName: "" } }),
            {},
          ),
        };
  }, [data, selectedUnit]);

  const validationSchema = useMemo(
    () =>
      z.object({
        isVisible: z.boolean(),
        content: z.record(
          z.string(),
          z.object({
            name: z.string().min(1),
            singularName: z.string().min(1),
            shortName: z.string().min(1),
          }),
        ),
      }),
    [],
  );

  const { mutateAsync: createAsync } = useCreateUnit();
  const { mutateAsync: editAsync } = useEditUnit();

  const onFormSubmit = async (values: UnitCreateDTO) => {
    if (selectedUnit) {
      await editAsync({ ...values, id: selectedUnit });
    } else {
      await createAsync(values);
    }

    closeForm();
  };

  const onCreateButtonClicked = () => {
    setSelectedItem(undefined);
    toggleFormOpen();
  };

  return (
    <Box display="flex" flexDirection="column" py={3}>
      <Button
        disabled={isFormOpen}
        onClick={onCreateButtonClicked}
        sx={{ color: "grey.800", ml: "auto", fontWeight: 600 }}
        variant="contained"
      >
        {t("pages.management.units.form.button")}
      </Button>
      {(isFormOpen || isFormMounted) && (
        <Grow in={isFormOpen} onEnter={() => setIsFormMounted(true)} onExited={() => setIsFormMounted(false)}>
          <Form defaultValues={defaultValues} onFormSubmit={onFormSubmit} validationSchema={validationSchema}>
            <Box
              alignItems="center"
              boxShadow="1px 4px 6px #aaa"
              columnGap={3}
              display="grid"
              gridTemplateColumns="minmax(70px,max-content) repeat(2,minmax(120px, max-content)) auto"
              mt={2}
              p={3}
              rowGap={2}
            >
              {languages.map(language => (
                <Fragment key={language}>
                  <Typography fontWeight="bold">{t(`languages.${language}`)}</Typography>
                  <FormTextField
                    label={t("pages.management.units.form.fields.name")}
                    name={`content.${language}.name`}
                  />
                  <FormTextField
                    label={t("pages.management.units.form.fields.singular_name")}
                    name={`content.${language}.singularName`}
                  />
                  <FormTextField
                    label={t("pages.management.units.form.fields.short_name")}
                    name={`content.${language}.shortName`}
                    sx={{ maxWidth: "140px" }}
                  />
                </Fragment>
              ))}
              <FormCheckbox label={t("pages.management.units.form.fields.is_visible")} name="isVisible" />
              <Box display="flex" gap={2} gridColumn="1 / 1">
                <Button color="secondary" onClick={closeForm} size="large">
                  {t("common.buttons.cancel")}
                </Button>
                <Button size="large" type="submit" variant="contained">
                  {t("common.buttons.save")}
                </Button>
              </Box>
            </Box>
          </Form>
        </Grow>
      )}
    </Box>
  );
};

export default ManagementUnitsPageForm;
