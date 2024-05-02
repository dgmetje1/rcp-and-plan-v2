import axios, { AxiosInstance } from "axios";

export class SocialService {
  private static readonly _serviceName: string = "SOCIAL";
  private readonly _client: AxiosInstance;
  constructor() {
    this._client = axios.create({
      baseURL: process.env[`SERVICE_${SocialService._serviceName}`],
    });
  }

  getUserByAccountId(accountId: string) {
    return this._client.get(`/users/account/${accountId}`);
  }
  getUserById(id: string) {
    return this._client.get(`/users/${id}`);
  }
}
