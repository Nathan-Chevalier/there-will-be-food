export const getAllFood = () => {
  return fetch(
    "http://localhost:8088/foods?_expand=type&_expand=quantityUnit&_expand=image&_expand=storage"
  ).then((res) => res.json());
};

export const getPantryFood = () => {
  return fetch(
    "http://localhost:8088/foods?_expand=type&_expand=quantityUnit&_expand=image&_expand=storage&storageId=1"
  ).then((res) => res.json());
};

export const getFridgeFood = () => {
  return fetch(
    "http://localhost:8088/foods?_expand=type&_expand=quantityUnit&_expand=image&_expand=storage&storageId=2"
  ).then((res) => res.json());
};

export const getFreezerFood = () => {
  return fetch(
    "http://localhost:8088/foods?_expand=type&_expand=quantityUnit&_expand=image&_expand=storage&storageId=3"
  ).then((res) => res.json());
};
