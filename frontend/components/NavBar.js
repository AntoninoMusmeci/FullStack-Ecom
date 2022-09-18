import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Bag from "./Bag";
import { AiOutlineShoppingCart } from "react-icons/Ai";
import { useStateContext } from "../utils/context";

function NavBar() {

  const {showBag, setShowBag,totalQuantity} = useStateContext()

  return (
    <NavStyled>
     
      <Link href={"/"}> Home </Link>

      <NavIcons onClick = {() => {setShowBag(true)}}>
        <div>
        {totalQuantity > 0 && <span> {totalQuantity}</span>}
          <AiOutlineShoppingCart />
            <h3> Cart </h3> 
        </div>
      </NavIcons>
      {showBag && <Bag/>}
  
    </NavStyled>
  );
}
const NavStyled = styled.nav`
 
  min-height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #303030;
  a {
    font-size: 1.2rem;
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
    cursor: pointer;
  }
  h3{
    font-size: 0.75rem;
    padding: 0.25rem;
  }

  svg {
    font-size: 1.5rem;
  }
  span {
    background: #ff2626;
    color: white;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    position: absolute;
    right: -10%;
    top: -20%;
    font-weight: 700;
    pointer-events: none;
  }
`;





export default  NavBar;
