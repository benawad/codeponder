export const removeDuplicates = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};
