import axios, { AxiosRequestConfig } from "axios";

import config from "@/config";

import { RequestConfig } from "./types";

export class Api {
  private static _accessToken: string | null;
  private _axiosInstance;
  constructor() {
    this._axiosInstance = axios.create({ baseURL: config.apiUrl });
  }
  public async get<T>(url: string, config?: RequestConfig) {
    const headers: AxiosRequestConfig["headers"] = {};
    if (config?.withAuth) {
      if (!Api._accessToken) throw new Error("User unauthorized");
      headers.Authorization = `Bearer ${Api._accessToken}`;
    }
    const response = await this._axiosInstance.request<T>({
      method: "GET",
      url,
      headers,
      ...config,
    });
    return response.data;
  }

  public static setAccessToken(token: string) {
    this._accessToken = token;
    console.log(token);
  }

  public static clearAccessToken() {
    this._accessToken = null;
  }
}
