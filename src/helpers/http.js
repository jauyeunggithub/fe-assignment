export const fetchAllProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  return res.json();
};

export const searchProductsByKeyword = async (keyword) => {
  const res = await fetch(`https://dummyjson.com/products/search?q=${keyword}`);
  return res.json();
};
