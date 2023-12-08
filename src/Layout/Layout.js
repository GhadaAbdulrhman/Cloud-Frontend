import React, { useContext, useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import AuthContext from "Store/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Layout = ({ children }) => {
  const history = useHistory();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      history.push("/clothingstore/auth");
    }
  });

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
