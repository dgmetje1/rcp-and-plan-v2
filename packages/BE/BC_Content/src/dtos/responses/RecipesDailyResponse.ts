export type RecipesDailyResponse = {
  id: number;
  title: string;
  time: number;
  author: string;
  thumbnailUrl: string;
  publicationDate: Date;
  portions: number;
  difficulty: number;
  categories: {
    id: number;
    name: string;
  }[];
  ingredients: {
    id: number;
    name: string;
    singularName: string;
    quantity: number;
    optional: boolean;
    units: {
      id: number;
      name: string;
      shortName: string;
    };
  }[];
};
