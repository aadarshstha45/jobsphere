export const convertDate = (date: Date) => {
  return new Date(date).toISOString().replace("T", " ");
};
