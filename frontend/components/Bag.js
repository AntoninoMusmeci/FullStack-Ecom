import React from "react";
import styled from "styled-components";
import { useStateContext } from "../utils/context";
import { handleCheckout } from "../utils/stripeApi"
import { QuantitySectionStyled } from "../pages/products/[slug]";
import { AiOutlineShoppingCart } from "react-icons/Ai";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const { motion } = require("framer-motion");

function Bag() {
  const { bag, setShowBag, addToBag, decreaseQuantity, total } =
    useStateContext();
  return (
    <BagWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowBag(false)}
    >
      <BagStyled
        layout
        animate={{ x: "0%" }}
        initial={{ x: "50%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {bag.length < 1 ? (
          <EmptyBagStyle
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.7 }}
            transition={{ delay: 0.4 }}
          >
            <h1> Your Cart is Empty</h1>
            <AiOutlineShoppingCart />
          </EmptyBagStyle>
        ) : (
          bag.map((item) => {
            return (
              <ItemStyled
                layout
                key={item.product.slug}
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.7, transition: { delay: 0.4 }}}
              
              >
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
        <TotalStyled layout>
          {bag.length > 0 && (
            <div>
              {" "}
              <h3> Subtotal: {total}$ </h3>
              <button onClick = {() => handleCheckout(bag) }> Purchase </button>
            </div>
          )}
        </TotalStyled>
      </BagStyled>
    </BagWrapper>
  );
}

const BagWrapper = styled(motion.div)`
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

const BagStyled = styled(motion.div)`
  width: 40%;
  background: #f1f1f1;
  padding: 2rem 5rem;
  overflow-y: scroll;
  position: relative;
`;
const ItemStyled = styled(motion.div)`
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

const ItemInfo = styled(motion.div)`
  width: 50%;
  div {
    display: flex;
    justify-content: space-between;
  }
`;
const EmptyBagStyle = styled(motion.div)`
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

const TotalStyled = styled(motion.div)`
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
