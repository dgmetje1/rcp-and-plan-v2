import { useQueryClient } from "@tanstack/react-query";

import { Api } from "@/lib/api";
import { useApiMutation } from "@/middleware/api";
import { UnitCreateDTO } from "@/types/unit";

import { getUnitsKeys } from "./keys";

export const useCreateUnit = () => {
  const queryClient = useQueryClient();
  const createUnit = async (data: UnitCreateDTO) => {
    const api = new Api();
    const response = await api.post("units", data, { withAuth: true });

    return response;
  };

  return useApiMutation("", createUnit, {
    onSuccess: () => {
      const { queryKey } = getUnitsKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
