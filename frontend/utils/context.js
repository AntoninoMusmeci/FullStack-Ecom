import { createContext, useContext, useEffect, useState } from "react";
import { Context } from "urql";

const EcomContext = createContext();

export const StateContext = ({ children }) => {
  const [quantity, setQuantity] = useState(1);
  const [bag, setBag] = useState([]);
  const [showBag, setShowBag] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [total, setTotal] = useState(0)



  useEffect(() => {
    console.log("total MODIFIED", total);
  }, [total]);

  const addToBag = (product, quantity) => {
    setTotalQuantity((prevQuantity) => prevQuantity + quantity)
    console.log(product.price, quantity, product.price * quantity)
    setTotal((state) => total + product.price * quantity )

    if (
      bag.find((item) => {
        return item.product.slug === product.slug;
      })
    ) {
      setBag(
        bag.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setBag([...bag, { product: product, quantity: quantity }]);
    }
  };

  const decreaseQuantity = (product) => {
    setTotal((total) => total - product.price )
    setTotalQuantity((prevQuantity) => prevQuantity - 1)
    const exist = bag.find((item) => item.product.slug === product.slug);
    if (exist.quantity === 1)
      setBag(bag.filter((item) => item.product.slug !== product.slug));
    else
      setBag(
        bag.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
  };

  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decreseQuantity = () => {
    quantity > 1 && setQuantity((quantity) => quantity - 1);
  };
  return (
    <EcomContext.Provider
      value={{
        quantity,
        increaseQuantity,
        decreseQuantity,
        bag,
        addToBag,
        showBag,
        setShowBag,
        decreaseQuantity,
        totalQuantity,
        total
      }}
    >
      {children}
    </EcomContext.Provider>
  );
};

export const useStateContext = () => useContext(EcomContext);
