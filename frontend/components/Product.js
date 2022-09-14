import { Router } from "next/router";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
function Product({ name, price, productImage, slug }) {
  console.log(`/products/${slug}`)
  return (
    
    <ProductStyled>
      <Link href={`/products/${slug}`}>
        <div>
          <img src={productImage.data.attributes.formats.small.url} />
        </div>
        </Link>
        <h2>{name}</h2>
        <h3> {price}</h3>
      
    </ProductStyled>
  );
}

const ProductStyled = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  img {
    width: 100%;
  }
  cursor: pointer;
`;

export default Product;
