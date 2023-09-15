export const getAllTypes = () => {
  return fetch("http://localhost:8088/types").then((res) => res.json());
};

export const getAllUnits = () => {
  return fetch("http://localhost:8088/quantityUnits").then((res) => res.json());
};

export const getAllStorages = () => {
  return fetch("http://localhost:8088/storages").then((res) => res.json());
};

export const getAllImages = () => {
  return fetch("http://localhost:8088/images").then((res) => res.json());
};

export const getUserImages = () => {
  return fetch("http://localhost:8088/userImages").then((res) => res.json());
};
