import { createContext, useContext, useState } from "react";
import { Context } from "urql";

const EcomContext = createContext();

export const StateContext = ({ children }) => {
  const [quantity, setQuantity] = useState(1);
  return <EcomContext.Provider value = {{quantity}}>{children}</EcomContext.Provider>;
};

export const useStateContext = () => useContext(EcomContext)
