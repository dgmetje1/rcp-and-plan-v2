import axios from "axios";

import config from "@/config";

export class Api {
  private _axiosInstance;
  constructor() {
    this._axiosInstance = axios.create({ baseURL: config.apiUrl });
  }
  public async get<T>(url: string) {
    const response = await this._axiosInstance.request<T>({
      method: "GET",
      url,
    });
    return response.data;
  }
}