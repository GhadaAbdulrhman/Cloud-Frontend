import { makeStyles } from "@material-ui/styles";
import ButtonBlock from "Components/Buttons/ButtonBlock";
import InputField from "Components/InputField";
import AuthContext from "Store/AuthContext";
import axios from "axios";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [isSomethingWrong, setIsSomethingWrong] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setUser((oldData) => {
      return { ...oldData, [e.target.name]: e.target.value };
    });
  };

  const isValid = (word) => {
    if (word.trim()) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isValid(user.email) && isValid(user.password)) {
      axios
        .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/auth/login`, {
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          setUser({
            email: "",
            password: "",
          });
  
          const userRole = res.data.admin
            ? "admin"
            : res.data.designer
            ? "designer"
            : "regular";
  
          authContext.login(
            res.data._id ? res.data._id : "",
            res.data.email,
            res.data.jwt,
            userRole
          );
          setTimeout(() => {
            history.push("/clothingstore");
          }, 0);
        })
        .catch((error) => {
          if (
            error.response &&
            (error.response.data.error ===
              "Cannot read properties of null (reading 'password')" ||
              error.response.data.error === "Invalid Credentials")
          ) {
            setIsSomethingWrong(true);
          }
        });
    } else {
      setIsSomethingWrong(true);
    }
  };
  

  useEffect(() => {
    if (isSomethingWrong) {
      setTimeout(() => {
        setIsSomethingWrong(false);
      }, 3000);
    }
  }, [isSomethingWrong]);
  return (
    <Container
      className={clsx(classes.login, {
        "mt-4": true,
      })}
    >
      {isSomethingWrong && (
        <h5 style={{ color: "red" }}>Email Or Password Is Wrong!</h5>
      )}
      <form onSubmit={handleLogin}>
        <InputField
          icon="/icons/user/userBlack.svg"
          placeholder="Email"
          type="email"
          name="email"
          value={user.email}
          onChange={onInputChange}
          required
        />
        <InputField
          icon="/icons/password/passwordBlack.svg"
          placeholder="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={onInputChange}
          required
        />
        <div
          className={clsx(classes.check, {
            "mt-4 p-2 mb-2 ": true,
          })}
        >
          <Link className={classes.forgotPassword}>Forgot your password?</Link>
        </div>
        <ButtonBlock text="Login" type="submit" />
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  login: {
    maxWidth: 450,
  },
  forgotPassword: {
    lineHeight: "18px",
    fontSize: "14px",
    fontWeight: "700",
    marginLeft: "auto",
    color: theme.colors.grey,
  },
  check: {
    ["@media (max-width:360px)"]: {
      flexDirection: "column",
      "& a": {
        marginLeft: "inherit!important",
        marginTop: 6,
      },
    },
  },
}));

export default Login;
