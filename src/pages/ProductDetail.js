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
  const {
    thumbnail,
    description,
    title,
    price,
    rating,
    stock,
    category,
    images,
  } = product;

  return (
    <div>
      <h2>{title}</h2>
      <img src={thumbnail} alt={description} />
      <p>Price: ${price}</p>
      <p>{description}</p>
      <p>Rating: {rating}/5</p>
      <p>{stock} available</p>
      <p>Category: {category} </p>
      <p>Images</p>
      {Array.isArray(images)
        ? images.map((url) => (
            <img className="w-150" src={url} alt={url} key={url} />
          ))
        : "No images available"}
    </div>
  );
}

export default ProductDetail;
