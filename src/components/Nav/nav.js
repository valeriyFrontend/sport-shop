import { Link } from "react-router-dom";
import './navigation.scss';

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
                <span className="nav__button-close" onClick={closeMenu}>&#10006;</span>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contacts">Contact</Link></li>
                </ul>
            </nav>
            <div className="overlay" onClick={closeMenu}></div>
        </>
    )
}

export default Navigation;