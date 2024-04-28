import axios, { AxiosInstance } from "axios";

export class SocialService {
  private static readonly _serviceName: string = "SOCIAL";
  private readonly _client: AxiosInstance;
  constructor() {
    this._client = axios.create({
      baseURL: process.env[`SERVICE_${SocialService._serviceName}`],
    });
  }
  postExample(body: any) {
    return this._client.post("/", body);
  }
  getData() {
    return this._client.get("/");
  }
  getDataById(id: number) {
    return this._client.get(`/${id}`);
  }
}
