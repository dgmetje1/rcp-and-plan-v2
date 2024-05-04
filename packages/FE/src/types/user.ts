export const languages = ["en", "es", "fr", "ca"] as const;
export type Language = (typeof languages)[number];

export type User = {
  id: string;
  accountId: string;
  nickName: string;
  name: string;
  lastName: string;
  email: string;
  language: Language;
  profilePicture: string | null;
};

export type UserAccountDTO = User;
export type UserDTO = User;
