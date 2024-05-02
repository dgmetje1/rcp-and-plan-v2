import { Api } from "@/lib/api";
import { UserAccountDTO } from "@/types/user";

export const getAccount = () =>
  new Api().get<UserAccountDTO>("users/account", { withAuth: true });
