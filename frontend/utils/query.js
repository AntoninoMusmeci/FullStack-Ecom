export const QUERY_PRODUCTS = `query{
    products{
          data{
        attributes{
          Title
          Description
          slug
          price
          image{
            data{attributes{formats}}
          }
        }
      }
    }
  }`;

export const QUERY_PRODUCT = `query getProduct($slug: String!){
  products(filters: {slug: {eq: $slug}}){
    data{
      attributes{
        Title
        Description
        slug
        price
        image{
          data{attributes{formats}}
        }
      }
    }
  }
}`;
