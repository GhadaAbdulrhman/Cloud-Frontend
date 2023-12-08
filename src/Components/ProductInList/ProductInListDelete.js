import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import ButtonRound from "Components/Buttons/ButtonRound";
import useStore from "Store/StoreContext";
import Url from "Paths";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "Store/AuthContext";
import axios from "axios";

const ProductInListDelete = (props) => {
  const classes = useStyles();
  const user = useContext(AuthContext);
  const id = user.user._id;

  const { getCurrentCart } = useStore();

  console.log("props is ", props);

  const handleDelete = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/cart/${id}/remove`, {
        productId: props.productId,
      })
      .catch((err) => {
        console.log("err is ", err);
      });
    await getCurrentCart();
  };
  const handleIncreaseDecrease = async (type) => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/cart/${id}/update-quantity`, {
        productId: props.productId,
        quantityDelta: type == "increase" ? 1 : -1,
      })
      .catch((err) => {
        console.log("err is ", err);
      });
    await getCurrentCart();
  };

  return (
    <div className={`${classes.delete} mt-auto`}>
      <ButtonRound
        size="28px"
        icon="/icons/trash.svg"
        background="transparent"
        onClick={handleDelete}
      />
      <div style={{ gap: "5px", display: "grid", placeItems: "center" }}>
        <p
          className={`${classes.p}`}
          style={{ backgroundColor: "green" }}
          onClick={() => handleIncreaseDecrease("increase")}
        >
          +
        </p>
        <p
          className={`${classes.p}`}
          style={{ backgroundColor: "red" }}
          onClick={() => handleIncreaseDecrease("decrease")}
        >
          -
        </p>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  delete: {
    marginLeft: "-4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  p: {
    fontWeight: "900",
    fontSize: "xx-large",
    color: "white",
    textAlign: "center",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    cursor: "pointer",
  },
}));

export default ProductInListDelete;
