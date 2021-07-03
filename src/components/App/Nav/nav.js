import { NavLink } from "react-router-dom";

import "./navigation.scss";

function closeMenu() {
  const overlay = document.querySelector(".overlay"),
    openMenu = document.querySelector(".nav");

  openMenu.classList.remove("show");
  overlay.classList.remove("back-bg");
}

function Navigation() {
  return (
    <>
      <nav className="nav">
        <span className="nav__button-close" onClick={closeMenu}>
          &#10006;
        </span>
        <ul className="nav__list">
          <li className="nav__list-link">
            <NavLink activeClassName="selected" exact to="/">
              Home
            </NavLink>
          </li>
          <li className="nav__list-link">
            <NavLink activeClassName="selected" to="/products">
              Shop
            </NavLink>
          </li>
          <li className="nav__list-link">
            <NavLink activeClassName="selected" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav__list-link">
            <NavLink activeClassName="selected" to="/contacts">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="overlay" onClick={closeMenu}></div>
    </>
  );
}

export default Navigation;
