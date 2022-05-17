import React from "react";
import { NavbarWrapper, NavImage } from "../Styles/Navbar.style";
import HomeIcon from "../../images/icons/homeicon.png";
import CartIcon from "../../images/icons/carticon.png";
import UserIcon from "../../images/icons/usericon.png";
import CategoryIcon from "../../images/icons/categories.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <NavbarWrapper>
        <ul>
          <li>
            <Link to="/">
              <NavImage src={HomeIcon} />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <NavImage src={UserIcon} />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <NavImage src={CartIcon} />
            </Link>
          </li>
          <li>
            <Link to="/category">
              <NavImage src={CategoryIcon} />
            </Link>
          </li>
        </ul>
      </NavbarWrapper>
    </>
  );
}

export default Navbar;
