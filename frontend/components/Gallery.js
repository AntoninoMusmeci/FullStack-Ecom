import React from "react";
import Product from "./Product";
import styled from "styled-components";
function Gallery({ products }) {
  return (
    <div>
      <main>
        <GalleryStyled>
          {products.map((product) => (
            <Product
              key={product.attributes.slug}
              name={product.attributes.Title}
              price={product.attributes.price}
              productImage={product.attributes.image}
              slug = {product.attributes.slug}
            >
              {" "}
            </Product>
          ))}
        </GalleryStyled>
      </main>
    </div>
  );
}
const GalleryStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
`;

export default Gallery;
