import React from "react";
import { useQuery } from "urql";
import { QUERY_PRODUCT } from "../../utils/query";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useStateContext } from "../../utils/context";
import {toast} from "react-hot-toast"
function ProductDetails() {
  //Fetch data from strapi (graph qa)
  const { query } = useRouter();
  const [results] = useQuery({
    query: QUERY_PRODUCT,
    variables: { slug: query.slug },
  });

  const { data, fetching, error } = results;
  if (fetching) return <p> loading... </p>;
  if (error) return <p> Error!! </p>;

  console.log(data.products.data);
  const product = data.products.data[0].attributes
  const { Title, Description, image, price } = product
  const {quantity, increaseQuantity, decreseQuantity, addToBag} = useStateContext()
  const notify = () => {
    toast.success(`${Title}: ${Description} added to the cart`)
  }
  return (
    <ProductDetailsStyled>
      <img src={image.data.attributes.formats.medium.url} />
      <ProductInfoStyled>
        <h2> {Title} </h2>
        <h3> {Description} </h3>
        <h3> {price} </h3>

        <QuantitySectionStyled>
          <span> Quantity </span>    
          <button onClick={decreseQuantity}>
          <FaMinusCircle />
          </button >
          <p> {quantity} </p>
          <button onClick={increaseQuantity}>
            <FaPlusCircle />
          </button>
        </QuantitySectionStyled>
        <AddButtonStyled onClick = { () => {  notify(), addToBag(product, quantity)}}> Add to Cart </AddButtonStyled>
      </ProductInfoStyled>
    </ProductDetailsStyled>
  );
}

const ProductDetailsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  img {
    width: 40%;
  }
`;

const ProductInfoStyled = styled.div`
  width: 40%;
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;
export const QuantitySectionStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
  button {
    background: transparent;
    border: none;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;

const AddButtonStyled = styled.button`
  width: 100%;
  background-color: var(--primary);
  color: white;
  font-weight: 500;
`;
export default ProductDetails;
