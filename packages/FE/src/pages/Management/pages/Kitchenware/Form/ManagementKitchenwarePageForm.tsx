import { Fragment, useMemo, useState } from "react";
import { Box, Button, Grow, Typography } from "@mui/material";
import { shake } from "radash";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import Form, { FormTextField } from "@/components/common/Form";
import { useCreateKitchenware, useEditKitchenware, useSuspenseGetKitchenware } from "@/queries/kitchenware";
import { KitchenwareCreateDTO } from "@/types/kitchenware";
import { languages } from "@/types/user";

import { useManagementItemsPageContext } from "../../../context/ManagementItemsPage";

const nameSchema = z
  .union([z.string().min(1), z.string().length(0)])
  .optional()
  .transform(e => (e === "" ? undefined : e));

const formSchema = z.object({
  content: z.record(
    z.string(),
    z.object({
      name: nameSchema,
      singularName: nameSchema,
    }),
  ),
});

const ManagementKitchenwarePageForm = () => {
  const { t } = useTranslation();

  const {
    selectedItem: selectedTool,
    setSelectedItem,
    isFormOpen,
    toggleFormOpen,
    closeForm,
  } = useManagementItemsPageContext();
  const [isFormMounted, setIsFormMounted] = useState(isFormOpen);

  const { data } = useSuspenseGetKitchenware();

  const defaultValues = useMemo(() => {
    const selectedToolInfo = data.find(tool => tool.id === selectedTool);

    return selectedToolInfo
      ? selectedToolInfo
      : {
          content: languages.reduce((prev, lang) => ({ ...prev, [lang]: { name: "", singularName: "" } }), {}),
        };
  }, [data, selectedTool]);

  const validationSchema = useMemo(() => formSchema, []);

  const { mutateAsync: createAsync } = useCreateKitchenware();
  const { mutateAsync: editAsync } = useEditKitchenware();

  const onFormSubmit = async ({ content: rawContent }: KitchenwareCreateDTO) => {
    const content = shake(rawContent, value => !value.name);

    if (selectedTool) {
      await editAsync({ id: selectedTool, content });
    } else {
      await createAsync({ content });
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
        {t("pages.management.kitchenware.form.button")}
      </Button>
      {(isFormOpen || isFormMounted) && (
        <Grow in={isFormOpen} onEnter={() => setIsFormMounted(true)} onExited={() => setIsFormMounted(false)}>
          <Form defaultValues={defaultValues} onFormSubmit={onFormSubmit} validationSchema={validationSchema}>
            <Box
              alignItems="center"
              boxShadow="1px 4px 6px #aaa"
              columnGap={3}
              display="grid"
              gridTemplateColumns="minmax(70px,max-content) repeat(2,minmax(120px, max-content))"
              mt={2}
              p={3}
              rowGap={2}
            >
              {languages.map(language => (
                <Fragment key={language}>
                  <Typography fontWeight="bold">{t(`languages.${language}`)}</Typography>
                  <FormTextField
                    label={t("pages.management.kitchenware.form.fields.name")}
                    name={`content.${language}.name`}
                  />
                  <FormTextField
                    label={t("pages.management.kitchenware.form.fields.singular_name")}
                    name={`content.${language}.singularName`}
                  />
                </Fragment>
              ))}
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

export default ManagementKitchenwarePageForm;
