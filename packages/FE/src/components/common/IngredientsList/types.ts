import { Ingredient } from "@/types/ingredients";

export type IngredientsListProps = {
  items: Ingredient[];
  title: React.ReactNode;
  shouldSeeMoreBeShown?: boolean;
};
