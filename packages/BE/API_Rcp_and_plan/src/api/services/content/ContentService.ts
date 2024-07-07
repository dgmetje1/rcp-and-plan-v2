import {
  RecipeCreateRequest,
  RecipeCreateStepsRequest,
  RecipeDailyResponse,
  RecipeIngredientRequest,
  RecipeKitchenwareRequest,
  RecipeResponse,
  RecipesListQueryRequest,
  RecipesListResponse,
  UnitsListResponse,
} from "@rcp-and-plan/bc_content";
import { propagateHeaders } from "@rcp-and-plan/commons";
import axios, { AxiosInstance } from "axios";
import { IncomingHttpHeaders } from "http";
import { Service } from "typedi";

@Service()
export class ContentService {
  private static readonly _serviceName: string = "CONTENT";
  private readonly _client: AxiosInstance;

  constructor() {
    this._client = axios.create({
      baseURL: process.env[`SERVICE_${ContentService._serviceName}`],
    });
  }

  //#region Recipes
  public getRecipes(queryRequest: RecipesListQueryRequest, headers: IncomingHttpHeaders) {
    return this._client.get<RecipesListResponse>("/recipes", {
      params: queryRequest,
      headers: propagateHeaders(headers),
    });
  }
  public getRecipeById(id: string) {
    return this._client.get<RecipeResponse>(`/recipes/${id}`);
  }

  public getDailyRecipe() {
    return this._client.get<RecipeDailyResponse>("/recipes/daily");
  }

  public createRecipe(request: RecipeCreateRequest) {
    return this._client.post("/recipes", request);
  }

  public addRecipeKitchenware(id: string, request: RecipeKitchenwareRequest) {
    return this._client.put(`/recipes/${id}/kitchenware`, request);
  }

  public addRecipeIngredients(id: string, request: RecipeIngredientRequest) {
    return this._client.put(`/recipes/${id}/ingredients`, request);
  }

  public addRecipeSteps(id: string, request: RecipeCreateStepsRequest) {
    return this._client.put(`/recipes/${id}/ingredients`, request);
  }
  //#endregion

  //#region Units

  public getUnits() {
    return this._client.get<UnitsListResponse>("/units");
  }
  //#endregion
}
