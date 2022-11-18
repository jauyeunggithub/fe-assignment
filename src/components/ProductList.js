function ProductList({ products }) {
  return (
    <div className="d-flex flex-wrap gap-10">
      {products.map((p) => {
        const { thumbnail, description, title } = p;
        return (
          <section className="w-150">
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
