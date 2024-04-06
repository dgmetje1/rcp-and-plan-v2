export type Recipe = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  header_img: string;
  unique_id: string;
  language: string;
  difficulty: number;
  time: number;
  portions: number;
  visibility: number;
  author: string;
  publication_date: Date;
};

export type RecipeListItem = Pick<Recipe, "id" | "title" | "thumbnail_url">;

export type RecipeList = Array<RecipeListItem>;
