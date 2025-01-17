import { Api } from "@/lib/api";
import { UnitsDTO } from "@/types/unit";

export const getUnits = () => {
  return new Api().get<UnitsDTO>("units");
};
