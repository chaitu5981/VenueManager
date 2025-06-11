export const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};
export const fetchDate = (date) => {
  return new Date(date).toLocaleDateString("en-in").replaceAll("/", "-");
};

export const fetchDate1 = (date) => {
  return new Date(date).toLocaleDateString("en-in", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
export const fetchTime = (date) =>
  new Date(date).toLocaleTimeString("en-in", {
    hour: "2-digit",
    minute: "2-digit",
  });
export const fetchDateAndTime = (date) => {
  return new Date(date).toLocaleString("en-in", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
export const capitalize = (s) => {
  return s[0].toUpperCase() + s.slice(1);
};

export const validateText = (t, fieldName) => {
  if (!t) return `Enter Valid ${fieldName}`;
  else return "";
};

export const validateNumber = (v, fieldName) =>
  isNaN(Number(v.trim())) || Number(v.trim()) <= 0
    ? `Enter Valid  ${fieldName}`
    : "";

export const validateName = (name) => {
  if (!name.trim()) return "Enter Valid Name";
  else return "";
};

export const validatePhone = (phone) => {
  if (isNaN(Number(phone)) || phone.trim().length !== 10)
    return "Enter Valid Phone no";
  else return "";
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (email && !emailRegex.test(email)) return "Please enter valid email";
  else return "";
};
export const validateAddress = (address) => {
  if (!address.trim()) return "Enter Valid Address";
  else return "";
};
