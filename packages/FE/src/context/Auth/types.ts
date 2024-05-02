import { UserAccountDTO } from "@/types/user";

export type AuthContextValues = {
  account: UserAccountDTO | undefined;
  isAccountLoading: boolean;
};
