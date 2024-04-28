import axios, { AxiosInstance } from "axios";
import { RecipesListQueryRequest } from "@rcp-and-plan/bc_content";

export class ContentService {
  private static readonly _serviceName: string = "CONTENT";
  private readonly _client: AxiosInstance;
  constructor() {
    this._client = axios.create({
      baseURL: process.env[`SERVICE_${ContentService._serviceName}`],
    });
  }
  getRecipes(queryRequest: RecipesListQueryRequest) {
    return this._client.get("/recipes", { params: queryRequest });
  }
  getRecipeById(id: number) {
    return this._client.get(`/recipes/${id}`);
  }
  getDailyRecipe() {
    return this._client.get("/recipes/daily");
  }
}
