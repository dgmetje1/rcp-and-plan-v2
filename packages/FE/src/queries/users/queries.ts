import { Api } from "@/lib/api";
import { UserAccountDTO, UserDTO } from "@/types/user";

const authRequestOptions = { withAuth: true };

export const getAccount = () => {
  console.log("CALLING API");
  return new Api().get<UserAccountDTO>("users/account", authRequestOptions);
};

export const getUser = () => {
  console.log("CALLING USER APi");
  return new Api().get<UserDTO>("users", authRequestOptions);
};
