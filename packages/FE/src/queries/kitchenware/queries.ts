import { Api } from "@/lib/api";
import { KitchenwareDTO } from "@/types/kitchenware";

export const getKitchenware = () => {
  return new Api().get<KitchenwareDTO>("kitchenware");
};
