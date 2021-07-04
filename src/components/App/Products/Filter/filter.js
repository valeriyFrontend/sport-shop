import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

function Filter({ products, changeState }) {
  const { t } = useTranslation();

  const filterProductsByType = (event) => {
    if (event.target.value === "all") {
      changeState(products);
      return;
    }
    products = products.filter((item) => item.category === event.target.value);
    changeState(products);
  };

  const options = [
    { value: "all", name: t("all_products") },
    { value: "tennis", name: t("tennis") },
    { value: "running", name: t("running") },
    { value: "training", name: t("training_and_gym") },
  ];

  return (
    <span className="products__sort-button">
      {t("show_me")}{" "}
      <select onChange={filterProductsByType}>
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
export default connect(mapStateToProps)(Filter);
