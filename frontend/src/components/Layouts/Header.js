import React from "react";
import { HeaderWrapper, SearchInput } from "../Styles/Header.style";

function Header() {
  return (
    <>
      <HeaderWrapper>
        <h2 className="heading">VX | Shop</h2>
        <SearchInput />
      </HeaderWrapper>
    </>
  );
}

export default Header;
