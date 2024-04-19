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
};
