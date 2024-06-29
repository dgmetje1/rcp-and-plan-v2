import { UserAccountResponse, UserSummaryResponse } from "dtos";

export interface IUserQueries {
  getDataById: (id: string) => Promise<UserAccountResponse>;
  getDataSummaryById: (id: string) => Promise<UserSummaryResponse>;
  getDataByAccountId: (id: string) => Promise<UserAccountResponse>;
}
