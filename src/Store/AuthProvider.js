import AuthContext from "./AuthContext";
import React, { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    userRole: "",
    token: "",
  });

  const authContext = {
    user,
    login: (_id, name, token, userRole) => {
      setUser({ _id, name, token, userRole });
    },
    logout: () => {
      setUser({
        _id: "",
        name: "",
        userRole: "",
        token: "",
      });
    },
  };

  useEffect(() => {
    console.log("user is ", user);
  }, [user]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
