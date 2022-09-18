import React from "react";
import styled from "styled-components";
import { useStateContext } from "../utils/context";
import { QuantitySectionStyled } from "../pages/products/[slug]";
import { AiOutlineShoppingCart } from "react-icons/Ai";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
function Bag() {
  const { bag, setShowBag, addToBag, decreaseQuantity, total } = useStateContext();
  return (
    <BagWrapper onClick={() => setShowBag(false)}>
      <BagStyled onClick={(e) => e.stopPropagation()}>
        {bag.length < 1 ? (
          <EmptyBagStyle>
            <h1> Your Cart is Empty</h1>
            <AiOutlineShoppingCart />
          </EmptyBagStyle>
        ) : (
          bag.map((item) => {
            return (
              <ItemStyled>
                <img
                  src={item.product.image.data.attributes.formats.thumbnail.url}
                  alt=""
                />
                <ItemInfo>
                  <h3>{item.product.Title}</h3>
                  <h3>{item.product.price}$</h3>
                  <QuantitySectionStyled>
                    <span>Quantity</span>
                    <button
                      onClick={() => {
                        decreaseQuantity(item.product);
                      }}
                    >
                      <AiFillMinusCircle />
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => {
                        addToBag(item.product, 1);
                      }}
                    >
                      <AiFillPlusCircle />
                    </button>
                  </QuantitySectionStyled>
                </ItemInfo>
              </ItemStyled>
            );
          })
        )}
        
        {bag.length > 0 && 
          <TotalStyled>
            <h3> Subtotal: {total}$ </h3>
            <button> Purchase </button>
          </TotalStyled>
        }
      </BagStyled>
    </BagWrapper>
  );
}

const BagWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

const BagStyled = styled.div`
  width: 40%;
  background: #f1f1f1;
  padding: 2rem 5rem;
  overflow-y: scroll;
  position: relative;
`;
const ItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  padding: 2rem;
  margin: 2rem 0rem;
  img {
    width: 8rem;
  }
`;

const ItemInfo = styled.div`
  width: 50%;
  div {
    display: flex;
    justify-content: space-between;
  }
`;
const EmptyBagStyle = styled.div`
  /* For the empty cart */
  position: absolute;
  top: 0;
  /*  */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80%;
  svg {
    font-size: 8rem;
    color: var(--secondary);
  }
`;

const TotalStyled = styled.div`
  button {
    background: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    color: white;
    margin-top: 2rem;
    cursor: pointer;
  }
`;

export default Bag;
