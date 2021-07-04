import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./navigation.scss";

function closeMenu() {
  const overlay = document.querySelector(".overlay"),
    openMenu = document.querySelector(".nav");

  openMenu.classList.remove("show");
  overlay.classList.remove("back-bg");
}

function Navigation() {
  const { t } = useTranslation();

  return (
    <>
      <nav className="nav">
        <span className="nav__button-close" onClick={closeMenu}>
          &#10006;
        </span>
        <ul className="nav__list">
          <li className="nav__list-link">
            <NavLink activeClassName="selected" exact to="/">
              {t("home")}
            </NavLink>
          </li>
          <li className="nav__list-link">
            <NavLink activeClassName="selected" to="/products">
              {t("shop")}
            </NavLink>
          </li>
          <li className="nav__list-link">
            <NavLink activeClassName="selected" to="/about">
              {t("about")}
            </NavLink>
          </li>
          <li className="nav__list-link">
            <NavLink activeClassName="selected" to="/contacts">
              {t("contacts")}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="overlay" onClick={closeMenu}></div>
    </>
  );
}

export default Navigation;
