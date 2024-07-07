import { Api } from "@/lib/api";
import { UnitsDTO } from "@/types/unit";

const authRequestOptions = { withAuth: true };

export const getUnits = () => {
  return new Api().get<UnitsDTO>("units", authRequestOptions);
};
