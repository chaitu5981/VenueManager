export const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

export const capitalize = (s) => {
  return s[0].toUpperCase() + s.slice(1);
};
