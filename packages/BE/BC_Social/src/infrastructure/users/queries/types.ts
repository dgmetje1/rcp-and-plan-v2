import { UserAccountResponse } from "dtos";

export interface IUserQueries {
  getDataById: (id: string) => Promise<UserAccountResponse>;
  getDataByAccountId: (id: string) => Promise<UserAccountResponse>;
}
