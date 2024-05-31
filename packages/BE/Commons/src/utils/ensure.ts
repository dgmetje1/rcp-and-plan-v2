export const ensureThat = <T extends Error>(condition: boolean, error: T) => {
  if (!condition) throw error;
};
