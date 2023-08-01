import React from "react";
import logo from "../images/Logo.svg";
import { Link } from "react-router-dom";


function Header({ onClick, nameButton, userEmail, path}) {



  return (
    <div>
      <header className="header">
        <img src={logo} alt="логотип" className="header__logo" />
        <nav className="header__nav">
          <p className="header__title">{userEmail}</p>
          <Link to={path} className="header__link" onClick = {onClick}>{nameButton}</Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;
