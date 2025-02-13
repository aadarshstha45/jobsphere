export const getFullPath = (relativePath: string): string => {
  const BASE_URL = process.env.BASE_URL;
  return `${BASE_URL}/${relativePath.replace(/\\/g, "/")}`;
};
