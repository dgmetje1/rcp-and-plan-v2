import { useQueryClient } from "@tanstack/react-query";

import { Api } from "@/lib/api";
import { useApiMutation } from "@/middleware/api";
import { KitchenwareCreateDTO, KitchenwareEditDTO, KitchenwareMergeDTO, Tool } from "@/types/kitchenware";

import { getKitchenwareKeys } from "./keys";

export const useCreateKitchenware = () => {
  const queryClient = useQueryClient();
  const createKitchenware = async (data: KitchenwareCreateDTO) => {
    const api = new Api();
    const response = await api.post("kitchenware", data);

    return response;
  };

  return useApiMutation("", createKitchenware, {
    onSuccess: () => {
      const { queryKey } = getKitchenwareKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useEditKitchenware = () => {
  const queryClient = useQueryClient();
  const editKitchenware = async (data: KitchenwareEditDTO) => {
    const api = new Api();
    const response = await api.put("kitchenware", data);

    return response;
  };

  return useApiMutation("", editKitchenware, {
    onSuccess: () => {
      const { queryKey } = getKitchenwareKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useDeleteKitchenware = () => {
  const queryClient = useQueryClient();
  const deleteKitchenware = async (id: Tool["id"]) => {
    const api = new Api();
    const response = await api.delete(`kitchenware/${id}`, null);

    return response;
  };

  return useApiMutation("", deleteKitchenware, {
    onSuccess: () => {
      const { queryKey } = getKitchenwareKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useMergeKitchenware = () => {
  const queryClient = useQueryClient();
  const mergeKitchenware = async (data: KitchenwareMergeDTO) => {
    const api = new Api();
    const response = await api.post("kitchenware/merge", data);

    return response;
  };

  return useApiMutation("", mergeKitchenware, {
    onSuccess: () => {
      const { queryKey } = getKitchenwareKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
