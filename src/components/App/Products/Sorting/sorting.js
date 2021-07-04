import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

function Sorting({ products, changeState }) {
  const { t } = useTranslation();

  const sortProduct = (event) => {
    const value = event.target.value;

    switch (value) {
      case "-price":
        products = products.sort((a, b) => b.price - a.price);
        break;
      case "price":
        products = products.sort((a, b) => a.price - b.price);
        break;
      case "name":
        products = products.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        return products;
    }
    changeState(products);
  };

  const options = [
    { value: "name", name: t("product_name") },
    { value: "-price", name: t("highest_price") },
    { value: "price", name: t("lowest_price") },
  ];

  return (
    <span className="products__sort-button">
      {t("sort_by")}{" "}
      <select onChange={sortProduct}>
        {options.map(({ value, name }) => (
          <option value={value} key={value}>
            {name}
          </option>
        ))}
      </select>
    </span>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}
export default connect(mapStateToProps)(Sorting);
