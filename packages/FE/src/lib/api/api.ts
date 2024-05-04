import axios, { AxiosRequestConfig } from "axios";

import config from "@/config";

import { ApiException } from "./apiException";
import { RequestConfig } from "./types";

const MAX_RETRIES = 3;

export class Api {
  private static _accessToken: string | null;
  private _axiosInstance;
  constructor() {
    this._axiosInstance = axios.create({ baseURL: config.apiUrl });
  }

  public async get<T>(url: string, config?: RequestConfig) {
    return this.request<T>("GET", url, config);
  }

  public async request<T>(
    method: string,
    url: string,
    config?: RequestConfig,
    retry: number = 0,
  ): Promise<T> {
    try {
      const headers: AxiosRequestConfig["headers"] = {};
      if (config?.withAuth) {
        if (!Api._accessToken)
          throw new ApiException("missing-user-token", "Missing user token");
        headers.Authorization = `Bearer ${Api._accessToken}`;
      }
      const response = await this._axiosInstance.request<T>({
        method,
        url,
        headers,
        ...config,
      });
      return response.data;
    } catch (err: unknown) {
      console.log(err);
      if (
        err instanceof ApiException &&
        err.errorCode === "missing-user-token" &&
        retry < MAX_RETRIES
      ) {
        await new Promise(resolve =>
          setTimeout(() => resolve(undefined), (retry + 1) * 1000),
        );
        return this.request<T>(method, url, config, retry + 1);
      } else {
        throw err;
      }
    }
  }

  public static setAccessToken(token: string) {
    this._accessToken = token;
    console.log(token);
  }

  public static clearAccessToken() {
    this._accessToken = null;
  }
}
