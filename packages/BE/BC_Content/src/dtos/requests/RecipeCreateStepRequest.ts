type RecipeCreateStepPublicationRequest = {
  title: string;
  body: string;
};

export type RecipeCreateStepRequest = {
  number: number;
  content: Record<string, RecipeCreateStepPublicationRequest>;
};

export type RecipeCreateStepsRequest = Array<RecipeCreateStepRequest>;
