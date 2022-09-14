import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/Ai";
function NavBar() {
  return (
    <NavStyled>
      <Link href={"/"}> Home </Link>
      <NavIcons>
        <div>
          <AiOutlineShoppingCart />
          <h3> Cart </h3>
        </div>
      </NavIcons>
    </NavStyled>
  );
}
const NavStyled = styled.nav`
 
  min-height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  a {
    font-size: 1.3rem;
  }
`;
const NavIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  div{
    margin-left: 3rem;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
  }
  h3{
    font-size: 1rem;
  }
`;

export default  NavBar;
