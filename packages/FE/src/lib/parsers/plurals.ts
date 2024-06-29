export const parseQuantityName = (quantity: number, name: string, singularName?: string) => {
  if (quantity === 1 && singularName) return singularName;
  return name;
};
