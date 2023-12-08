import { createContext } from "react";

const AuthContext = createContext({
  user: {
    _id: "",
    name: "",
    userRole: "",
    token: "",
  },
  login: (_id, name, token, userRole) => {},
  logout: () => {},
});

export default AuthContext;
