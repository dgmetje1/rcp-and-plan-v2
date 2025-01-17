import { Api } from "@/lib/api";
import { IngredientsDTO } from "@/types/ingredients";

export const getIngredients = () => {
  return new Api().get<IngredientsDTO>("ingredients");
};
