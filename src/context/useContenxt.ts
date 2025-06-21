import { useContext as useReactContext } from "react";
import { Context } from ".";

export const useContext = () => {
  const context = useReactContext(Context);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};
