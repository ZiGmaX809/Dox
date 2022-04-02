export const getItem = (key: string) => {
  const data = window.localStorage.getItem(key) || "";

  try {
    return JSON.parse(data);
  } catch (err) {
    return false;
  }
};

export const setItem = (key: string, value: any) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};
