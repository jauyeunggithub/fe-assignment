function AutoComplete({ choices = [], onChange, onKeyUp, value, required }) {
  return (
    <>
      <input
        list="products"
        id="productChoice"
        name="productChoice"
        onChange={onChange}
        value={value}
        required={required}
        placeholder="Search"
        onKeyUp={onKeyUp}
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
