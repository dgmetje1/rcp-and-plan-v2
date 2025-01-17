import { useQueryClient } from "@tanstack/react-query";

import { Api } from "@/lib/api";
import { useApiMutation } from "@/middleware/api";
import { Unit, UnitCreateDTO, UnitEditDTO } from "@/types/unit";

import { getUnitsKeys } from "./keys";

export const useCreateUnit = () => {
  const queryClient = useQueryClient();
  const createUnit = async (data: UnitCreateDTO) => {
    const api = new Api();
    const response = await api.post("units", data);

    return response;
  };

  return useApiMutation("", createUnit, {
    onSuccess: () => {
      const { queryKey } = getUnitsKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useEditUnit = () => {
  const queryClient = useQueryClient();
  const editUnit = async (data: UnitEditDTO) => {
    const api = new Api();
    const response = await api.put("units", data);

    return response;
  };

  return useApiMutation("", editUnit, {
    onSuccess: () => {
      const { queryKey } = getUnitsKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useDeleteUnit = () => {
  const queryClient = useQueryClient();
  const deleteUnit = async (id: Unit["id"]) => {
    const api = new Api();
    const response = await api.delete(`units/${id}`, null);

    return response;
  };

  return useApiMutation("", deleteUnit, {
    onSuccess: () => {
      const { queryKey } = getUnitsKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
