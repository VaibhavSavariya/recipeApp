"use client";

import { createContext } from "react";
import useProduct from "./Hooks/useProduct";

export const ProductContext = createContext({});

export default function ContextProvider({ children }) {
  const { value } = useProduct();
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
