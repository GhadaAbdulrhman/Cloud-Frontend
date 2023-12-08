import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import { makeStyles, useTheme } from "@material-ui/styles";
import ButtonBlock from "Components/Buttons/ButtonBlock";
import clsx from "clsx";
import InputField from "Components/InputField";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    address: "",
    isDesigner: false,
  });
  const [isDataNotCompleted, setIsDataNotCompleted] = useState(false);

  const onInputChange = (e) => {
    setUser((oldData) => {
      return { ...oldData, [e.target.name]: e.target.value };
    });
  };

  const handleCheckboxChange = () => {
    setUser((oldData) => {
      return { ...oldData, isDesigner: !user.isDesigner };
    });
  };

  const isValid = (word) => {
    if (word.trim()) {
      return true;
    } else {
      return false;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      isValid(user.address) &&
      isValid(user.city) &&
      isValid(user.email) &&
      isValid(user.fullName) &&
      isValid(user.password) &&
      isValid(user.phoneNumber)
    ) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/signup`,
          {
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            city: user.city,
            address: user.address,
            isAdmin: false,
            isDesigner: user.isDesigner,
          },
          {
            headers: {
              "Content-Type": "application/json",
              // Add other headers if needed
            },
          }
        )
        .then((res) => {
          setUser({
            fullName: "",
            email: "",
            password: "",
            phoneNumber: "",
            city: "",
            address: "",
            isDesigner: false,
          });
          history.push("/");
        });
    } else {
      setIsDataNotCompleted(true);
    }
  };

  // Prevent any input that's not a number or certain characters related to phone numbers
  useEffect(() => {
    if (isDataNotCompleted) {
      setTimeout(() => {
        setIsDataNotCompleted(false);
      }, 3000);
    }
  }, [isDataNotCompleted]);
  return (
    <Container
      className={clsx(classes.login, {
        "mt-4": true,
      })}
    >
      {isDataNotCompleted && (
        <h5 style={{ color: "red" }}>!Please Be Sure To Fill All The Fields</h5>
      )}
      <form onSubmit={handleRegister}>
        <InputField
          required
          placeholder="Full Name"
          name="fullName"
          onChange={onInputChange}
          type="text"
          maxLength={20}
          value={user.fullName}
        />
        <InputField
          required
          placeholder="Email"
          name="email"
          onChange={onInputChange}
          type="email"
          maxLength={40}
          value={user.email}
        />
        <InputField
          required
          placeholder="Password"
          name="password"
          onChange={onInputChange}
          type="password"
          maxLength={20}
          value={user.password}
        />
        <InputField
          required
          placeholder="Phone Number"
          name="phoneNumber"
          onChange={onInputChange}
          type="number"
          max={100000000000000}
          value={user.phoneNumber}
        />
        <InputField
          required
          placeholder="City"
          name="city"
          onChange={onInputChange}
          type="text"
          maxLength={40}
          value={user.city}
        />
        <InputField
          required
          placeholder="Address"
          name="address"
          onChange={onInputChange}
          type="text"
          maxLength={40}
          value={user.address}
        />
        <div className="mt-4  mb-3 d-flex ml-4">
          <input
            required
            className="form-check-input"
            type="checkbox"
            id="designerCheckbox"
            checked={user.isDesigner}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="designerCheckbox">
            Designer (Checked Means You Are A Designer)
          </label>
        </div>
        <ButtonBlock text="Register" type="submit" />
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
}));

export default Register;
