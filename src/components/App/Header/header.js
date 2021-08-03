import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setClient } from "../../../redux/actions";
import { ReactComponent as MenuIcon } from "../../../icons/menu.svg";
import { GlobeAltIcon } from "@heroicons/react/outline";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import "./header.scss";

function openNav() {
  const overlay = document.querySelector(".overlay"),
    openMenu = document.querySelector(".nav");

  openMenu.classList.add("show");
  overlay.classList.add("back-bg");
}

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ru",
    name: "Руский",
    country_code: "ru",
  },
];

function Header({ items, client, fullPrice, setClient }) {
  const [showLanguages, setShowLanguages] = useState(false);
  const { t } = useTranslation();

  const logOut = () => {
    localStorage.removeItem("uid");
    setClient("");
  };

  return (
    <header className="header">
      <span className="header__button-menu" onClick={openNav}>
        <MenuIcon />
      </span>
      <Link className="header__logo" to="/sport-shop/">
        Sport-Shop
      </Link>
      <div className="header__info">
        {client.role === "admin" ? (
          <Link className="header__user-role" to="/sport-shop/admin/catalog">
            {client.role}
          </Link>
        ) : client.role === "user" ? (
          ""
        ) : (
          <Link className="header__user-role" to="/sport-shop/login">
            {t("sign_in")}
          </Link>
        )}
        <Link className="header__cart" to="/sport-shop/cart">
          <span>
            ${fullPrice}.00 ({items.length}){" "}
          </span>
          {t("cart")}
        </Link>
        {client.role && (
          <span className="header__log-out-button" onClick={logOut()}>
            {t("log_out")}
          </span>
        )}
        <div className="header__languages-list">
          <button
            className="header__button-globe"
            onClick={() => setShowLanguages(!showLanguages)}
          >
            <GlobeAltIcon />
          </button>
          {showLanguages ? (
            <ul className="header__languages">
              {languages.map(({ code, name, country_code }) => (
                <li key={country_code}>
                  <button
                    className="header__languages-item"
                    onClick={() => {
                      i18next.changeLanguage(code);
                      setShowLanguages(false);
                    }}
                  >
                    <span
                      className={`flag-icon flag-icon-${country_code}`}
                    ></span>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    fullPrice: state.fullPrice,
    items: state.items,
    client: state.client,
  };
}

const mapDispatchToProps = {
  setClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
