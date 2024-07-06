import { Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import { RecipeDetailRoute } from "@/config/routing";
import { useSuspenseGetRecipe } from "@/queries/recipes";
import { useSuspenseGetUserSummary } from "@/queries/users";

import RecipeDetailPageCard from "../RecipeDetailPageCard";

const RecipeDetailPageAuthorCard = () => {
  const { t } = useTranslation();
  const { id } = RecipeDetailRoute.useParams();
  const { data: recipe } = useSuspenseGetRecipe(id);

  const { data: authorInfo } = useSuspenseGetUserSummary(recipe.author);

  return (
    <RecipeDetailPageCard>
      <Typography fontWeight={600} variant="h5">
        {t("pages.recipe.author_title")}
      </Typography>
      <Box alignItems="center" columnGap={2} display="flex">
        <Avatar src={authorInfo.profilePicture ?? undefined} />
        <Box display="flex" flexDirection="column" justifyContent="flex-start">
          <Typography fontWeight={600} variant="body1">{`${authorInfo.name} ${authorInfo.lastName}`}</Typography>
          <Typography color="grey.600" fontStyle="italic" variant="body3">
            @{authorInfo.nickName}
          </Typography>
        </Box>
      </Box>
    </RecipeDetailPageCard>
  );
};

export default RecipeDetailPageAuthorCard;
