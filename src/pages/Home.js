import { useEffect, useMemo, useState } from "react";
import AutoComplete from "../components/AutoComplete";
import ProductList from "../components/ProductList";

function Home() {
  const [products, setProducts] = useState([]);
  const [
    productSearchResultsForAutocomplete,
    setProductSearchResultsForAutocomplete,
  ] = useState([]);
  const [keyword, setKeyword] = useState("");

  const getAllProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProducts(data.products);
  };
  const searchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${keyword}`
    );
    const data = await res.json();
    setProducts(data.products);
  };
  const searchProductResultsForAutoComplete = async (searchKeyword) => {
    setKeyword(searchKeyword);
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchKeyword}`
    );
    const data = await res.json();
    setProductSearchResultsForAutocomplete(data.products);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      return;
    }
    searchProducts();
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const productChoices = useMemo(() => {
    return productSearchResultsForAutocomplete.map(({ title, id }) => {
      return { label: title, value: id };
    });
  }, [productSearchResultsForAutocomplete]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <AutoComplete
          choices={productChoices}
          onChange={(e) => searchProductResultsForAutoComplete(e.target.value)}
          value={keyword}
          required
        />
        <input type="submit" />
      </form>

      <ProductList products={products} />
    </div>
  );
}

export default Home;
