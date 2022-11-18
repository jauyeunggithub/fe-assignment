import { useEffect, useMemo, useState } from "react";
import AutoComplete from "../components/AutoComplete";
import ProductList from "../components/ProductList";
import { fetchAllProducts, searchProductsByKeyword } from "../helpers/http";

function Home() {
  const [products, setProducts] = useState([]);
  const [
    productSearchResultsForAutocomplete,
    setProductSearchResultsForAutocomplete,
  ] = useState([]);
  const [keyword, setKeyword] = useState("");

  const getAllProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data.products);
  };

  const searchProducts = async () => {
    const data = await searchProductsByKeyword(keyword);
    setProducts(data.products);
  };

  const searchProductResultsForAutoComplete = async (searchKeyword) => {
    setKeyword(searchKeyword);
    const data = await searchProductsByKeyword(searchKeyword);
    setProductSearchResultsForAutocomplete(data.products);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      return;
    }
    searchProducts();
  };

  const clearSearch = () => {
    setKeyword("");
    getAllProducts();
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
      <h1>Store</h1>
      <form onSubmit={onSubmit}>
        <AutoComplete
          choices={productChoices}
          onChange={(e) => searchProductResultsForAutoComplete(e.target.value)}
          value={keyword}
          required
        />
        <input type="submit" value="Search" />
        <input type="button" value="Clear Search" onClick={clearSearch} />
      </form>

      <ProductList products={products} />
    </div>
  );
}

export default Home;
