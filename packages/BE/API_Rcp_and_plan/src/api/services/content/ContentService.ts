import {
  RecipeCreateRequest,
  RecipeCreateStepsRequest,
  RecipeDailyResponse,
  RecipeIngredientRequest,
  RecipeKitchenwareRequest,
  RecipeResponse,
  RecipesListQueryRequest,
  RecipesListResponse,
  UnitCreateRequest,
  UnitEditRequest,
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
  public getRecipeById(id: string, headers: IncomingHttpHeaders) {
    return this._client.get<RecipeResponse>(`/recipes/${id}`, { headers: propagateHeaders(headers) });
  }

  public getDailyRecipe(headers: IncomingHttpHeaders) {
    return this._client.get<RecipeDailyResponse>("/recipes/daily", { headers: propagateHeaders(headers) });
  }

  public createRecipe(request: RecipeCreateRequest, headers: IncomingHttpHeaders) {
    return this._client.post("/recipes", request, { headers: propagateHeaders(headers) });
  }

  public addRecipeKitchenware(id: string, request: RecipeKitchenwareRequest, headers: IncomingHttpHeaders) {
    return this._client.put(`/recipes/${id}/kitchenware`, request, { headers: propagateHeaders(headers) });
  }

  public addRecipeIngredients(id: string, request: RecipeIngredientRequest, headers: IncomingHttpHeaders) {
    return this._client.put(`/recipes/${id}/ingredients`, request, { headers: propagateHeaders(headers) });
  }

  public addRecipeSteps(id: string, request: RecipeCreateStepsRequest, headers: IncomingHttpHeaders) {
    return this._client.put(`/recipes/${id}/ingredients`, request, { headers: propagateHeaders(headers) });
  }
  //#endregion

  //#region Units

  public getUnits(headers: IncomingHttpHeaders) {
    return this._client.get<UnitsListResponse>("/units", { headers: propagateHeaders(headers) });
  }

  public createUnit(request: UnitCreateRequest, headers: IncomingHttpHeaders) {
    return this._client.post("/units", request, { headers: propagateHeaders(headers) });
  }

  public editUnit(request: UnitEditRequest, headers: IncomingHttpHeaders) {
    return this._client.put("/units", request, { headers: propagateHeaders(headers) });
  }

  public deleteUnit(id: string, headers: IncomingHttpHeaders) {
    return this._client.delete(`/units/${id}`, { headers: propagateHeaders(headers) });
  }
  //#endregion
}
