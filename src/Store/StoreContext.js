import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";

export const StoreContext = createContext({});

export const StoreContextProvider = ({ children }) => {
  const user = useContext(AuthContext);
  const [typeFilter, setTypeFilter] = useState("");

  const [cart, setCart] = useState([]);

  const [subTotal, setSubTotal] = useState(0);
  const [products, setProducts] = useState([]);
  

  const getCurrentCart = async () => {
    console.log("inside get Current cart");
    await axios
      .get(`${process.env.REACT_APP_SERVER_ENDPOINT}/cart/${user.user._id}`)
      .then((response) => {
        console.log("response is ", response.data);
        console.log("response is ", response.data.cart.products);
        setCart(response.data.cart.products);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  useEffect(() => {
    console.log("user is ", user);
    console.log("user.user._id is ", user.user._id);
    if (user.user.userRole?.toLowerCase() == "regular") {
      getCurrentCart();
    }
  }, [user]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        setCart,
        subTotal,
        setSubTotal,
        products,
        setProducts,
        typeFilter,
        setTypeFilter,
        getCurrentCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export default useStore;
