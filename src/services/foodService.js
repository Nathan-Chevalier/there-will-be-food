export const getAllFood = (user) => {
  return fetch(
    `http://localhost:8088/foods?_expand=type&_expand=quantityUnit&_expand=image&_expand=storage&userId=${user.id}`
  ).then((res) => res.json());
};

export const getPantryFood = (user) => {
  return fetch(
    `http://localhost:8088/foods?_expand=type&_expand=quantityUnit&_expand=image&_expand=storage&storageId=1&userId=${user.id}`
  ).then((res) => res.json());
};

export const getFridgeFood = (user) => {
  return fetch(
    `http://localhost:8088/foods?_expand=type&_expand=quantityUnit&_expand=image&_expand=storage&storageId=2&userId=${user.id}`
  ).then((res) => res.json());
};

export const getFreezerFood = (user) => {
  return fetch(
    `http://localhost:8088/foods?_expand=type&_expand=quantityUnit&_expand=image&_expand=storage&storageId=3&userId=${user.id}`
  ).then((res) => res.json());
};

export const getFoodById = (id) => {
  return fetch(
    `http://localhost:8088/foods/${id}?_expand=type&_expand=quantityUnit&_expand=image&_expand=storage`
  ).then((res) => res.json());
};
