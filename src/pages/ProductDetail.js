import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

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
      <div className="d-flex flex-wrap gap-10">
        <img src={thumbnail} alt={description} />
        <section>
          <p>Price: ${price}</p>
          <p>{description}</p>
          <ReactStars
            value={rating}
            count={5}
            edit={false}
            activeColor="#ffd700"
            emptyIcon={<i className="far fa-star" />}
            halfIcon={<i className="fa fa-star-half-alt" />}
            filledIcon={<i className="fa fa-star" />}
            size={30}
          />
          <p>{stock} available</p>
        </section>
      </div>
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
