import { useQueryClient } from "@tanstack/react-query";

import { Api } from "@/lib/api";
import { useApiMutation } from "@/middleware/api";
import { Ingredient, IngredientCreateDTO, IngredientEditDTO, IngredientMergeDTO } from "@/types/ingredients";

import { getIngredientsKeys } from "./keys";

export const useCreateIngredient = () => {
  const queryClient = useQueryClient();
  const createIngredient = async (data: IngredientCreateDTO) => {
    const api = new Api();
    const response = await api.post("ingredients", data);

    return response;
  };

  return useApiMutation("", createIngredient, {
    onSuccess: () => {
      const { queryKey } = getIngredientsKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useEditIngredient = () => {
  const queryClient = useQueryClient();
  const editIngredient = async (data: IngredientEditDTO) => {
    const api = new Api();
    const response = await api.put("ingredients", data);

    return response;
  };

  return useApiMutation("", editIngredient, {
    onSuccess: () => {
      const { queryKey } = getIngredientsKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();
  const deleteIngredient = async (id: Ingredient["id"]) => {
    const api = new Api();
    const response = await api.delete(`ingredients/${id}`, null);

    return response;
  };

  return useApiMutation("", deleteIngredient, {
    onSuccess: () => {
      const { queryKey } = getIngredientsKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useMergeIngredients = () => {
  const queryClient = useQueryClient();
  const mergeIngredients = async (data: IngredientMergeDTO) => {
    const api = new Api();
    const response = await api.post("ingredients/merge", data);

    return response;
  };

  return useApiMutation("", mergeIngredients, {
    onSuccess: () => {
      const { queryKey } = getIngredientsKeys();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
