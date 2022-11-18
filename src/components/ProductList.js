import ReactStars from "react-rating-stars-component";
import { createSearchParams, useNavigate } from "react-router-dom";

function ProductList({ products }) {
  const navigate = useNavigate();

  const onClick = (id) => {
    navigate({
      pathname: "product",
      search: createSearchParams({
        id,
      }).toString(),
    });
  };

  return (
    <div className="d-flex flex-wrap gap-10">
      {products.map((p) => {
        const {
          thumbnail,
          description,
          title,
          id,
          price,
          rating,
          stock,
          category,
        } = p;
        return (
          <section
            className="w-250 cursor-pointer"
            onClick={() => onClick(id)}
            key={id}
          >
            <h2>{title}</h2>
            <img src={thumbnail} alt={description} className="w-150" />
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
            <p>Category: {category} </p>
          </section>
        );
      })}
    </div>
  );
}

export default ProductList;
