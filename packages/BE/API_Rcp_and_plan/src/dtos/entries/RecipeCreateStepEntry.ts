type RecipeCreateStepPublicationEntry = {
  title: string;
  body: string;
};

export type RecipeCreateStepEntry = {
  number: number;
  content: Record<string, RecipeCreateStepPublicationEntry>;
};

export type RecipeCreateStepsEntry = Array<RecipeCreateStepEntry>;
