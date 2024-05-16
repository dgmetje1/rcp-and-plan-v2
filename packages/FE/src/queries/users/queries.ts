import { Api } from "@/lib/api";
import { UserAccountDTO, UserDTO } from "@/types/user";

const authRequestOptions = { withAuth: true };

export const getAccount = () => {
  try {
    return new Api().get<UserAccountDTO>("users/account", authRequestOptions);
  } catch (err: unknown) {
    throw new Error("User not found");
  }
};

export const getUser = () => {
  console.log("CALLING USER APi");
  return new Api().get<UserDTO>("users", authRequestOptions);
};
