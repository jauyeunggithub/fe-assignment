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
        const { thumbnail, description, title, id } = p;
        return (
          <section
            className="w-150 cursor-pointer"
            onClick={() => onClick(id)}
            key={id}
          >
            <h2>{title}</h2>
            <img src={thumbnail} alt={description} className="w-150" />
            <p>{description}</p>
          </section>
        );
      })}
    </div>
  );
}

export default ProductList;
