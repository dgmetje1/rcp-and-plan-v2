import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import RichTextContent from "@/components/common/RichTextContent";
import { RecipeDetailRoute } from "@/config/routing";
import { useSuspenseGetRecipe } from "@/queries/recipes";

const RecipeDetailPageStepsSection = () => {
  const { t } = useTranslation();

  const { id } = RecipeDetailRoute.useParams();
  const { data: recipe } = useSuspenseGetRecipe(id);

  if (!recipe.steps.length) return null;
  return (
    <Box component="section">
      <Typography variant="h4">{t("pages.recipe.steps_title")}</Typography>
      <Box component="ol">
        {recipe.steps.map(step => (
          <Box component="li" fontWeight="bold" key={`${recipe.id}-step-${step.number}`}>
            <Box component="span">{step.title}</Box>
            <Typography>
              <RichTextContent content={step.body} />
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecipeDetailPageStepsSection;
