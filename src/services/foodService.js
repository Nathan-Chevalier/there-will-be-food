export const getAllFood = () => {
  return fetch(
    "http://localhost:8088/foods?_expand=type&_expand=quantityUnit&_expand=image&_expand=storage"
  ).then((res) => res.json());
};
