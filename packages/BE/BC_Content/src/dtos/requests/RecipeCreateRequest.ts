export type RecipeCreateRequest = {
  difficulty: number;
  time: number;
  portions: number;
  visibility: number;
  author: string;
  publications: Record<string, RecipeCreatePublicationRequest>;
  categories: Array<string>;
};

type RecipeCreatePublicationRequest = {
  title: string;
  description: string;
};
