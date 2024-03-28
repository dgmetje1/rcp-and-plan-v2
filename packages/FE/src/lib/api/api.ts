import axios from "axios";

export class Api {
  private _axiosInstance;
  constructor() {
    this._axiosInstance = axios.create({ baseURL: "http://localhost:30000" });
  }
  public async get(url: string) {
    const response = await this._axiosInstance.request({ method: "GET", url });
    return response.data;
  }
}
