import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProductDetail() {
  const [search] = useSearchParams();
  const [product, setProduct] = useState({});
  const productId = useMemo(() => {
    return search.get("id");
  }, [search]);

  const getProduct = useCallback(async () => {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await res.json();
    setProduct(data);
  }, [productId]);

  useEffect(() => {
    getProduct(productId);
  }, [productId, getProduct]);
  const { thumbnail, description, title } = product;

  return (
    <div>
      <h2>{title}</h2>
      <img src={thumbnail} alt={description} />
      <p>{description}</p>
    </div>
  );
}

export default ProductDetail;
