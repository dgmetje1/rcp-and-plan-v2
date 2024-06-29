import { Api } from "@/lib/api";
import { UserAccountDTO, UserDTO, UserSummaryDTO } from "@/types/user";

const authRequestOptions = { withAuth: true };

export const getAccount = () => {
  try {
    return new Api().get<UserAccountDTO>("users/account", authRequestOptions);
  } catch (err: unknown) {
    throw new Error("User not found");
  }
};

export const getUser = () => {
  return new Api().get<UserDTO>("users", authRequestOptions);
};

export const getUserSummary = (userId: string) => {
  return new Api().get<UserSummaryDTO>(`users/${userId}/summary`);
};
