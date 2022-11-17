function AutoComplete({ choices = [], onChange, value, required }) {
  return (
    <>
      <input
        list="products"
        id="productChoice"
        name="productChoice"
        onChange={onChange}
        value={value}
        required={required}
      />
      <datalist id="products">
        {choices.map(({ label, value }) => {
          return <option value={label} key={value} />;
        })}
      </datalist>
    </>
  );
}

export default AutoComplete;
