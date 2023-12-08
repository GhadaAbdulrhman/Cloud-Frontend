import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import ProductSelectionColor from "./ProductSelectionColor";
import ButtonBlock from "Components/Buttons/ButtonBlock";
import UseStore from "Store/StoreContext";
import { withRouter } from "react-router-dom";
import ProductSelectionText from "./ProductSelectionText";
import ProductSelectionGraphics from "./ProductSelectionGraphics";
import axios from "axios";
import AuthContext from "Store/AuthContext";

const Product = (props) => {
  const user = useContext(AuthContext);

  const classes = useStyles();
  const { current } = props;
  const [prod, setProd] = useState({
    ...current,
    text: "",
    graphics: { alt: "" },
  });
  console.log("prod is ", prod);
  const { getCurrentCart } = UseStore();

  const addToCart = async () => {
    console.log("current is ", current);
    await axios
      .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/cart/${user.user._id}/add`, {
        productId: current._id,
        quantity: 1,
        color: prod.color,
        text: prod.text,
        design: prod.graphics.alt,
      })
      .catch((err) => {
        console.log("err is ", err);
      });
    getCurrentCart();
  };

  const setColor = (e) => {
    setProd((prevProd) => ({
      ...prevProd,
      color: e.target.name,
    }));
  };

  const setText = (text) => {
    setProd((prevProd) => ({
      ...prevProd,
      text,
    }));
  };

  const setGraphics = (graphic) => {
    setProd((prevProd) => ({
      ...prevProd,
      graphics: {
        src: graphic.src,
        alt: graphic.alt,
        width: graphic.width,
        height: graphic.height,
      },
    }));
  };

  return (
    <div className={classes.selection}>
      <h2 className={classes.title}>{current.name}</h2>
      <ProductSelectionColor color={prod.color} setColor={setColor} />
      <ProductSelectionText shirtText={prod.text} setShirtText={setText} />
      <ProductSelectionGraphics
        shirtGraphics={prod.graphics}
        setShirtGraphics={setGraphics}
      />
       <div className="mt-4 ">
      {user.user.userRole !== 'admin' && user.user.userRole !== 'designer' ? (
        <div className={classes.addToCartButton}>
          <ButtonBlock
            onClick={addToCart}
            fontWeight="400"
            text="Add to Cart"
          />
        </div>
      ) : (
        <p>You cannot add to cart.</p>
      )}
    </div>
    </div>
  );
};

export default withRouter(Product);

const useStyles = makeStyles((theme) => ({
  selection: {
    color: "#555",
    textAlign: "center",
  },
  title: {
    color: "#555",
  },
  buttonContainer: {
    width: "300px",
    margin: "auto",
  },
  addToCartButton: {
    width: "100%",
    margin: "auto",
    maxWidth: "300px",
    height: "44px",
    backgroundColor: "rgb(85 30 30) !important",
    color: "rgb(255 255 255) !important",
    borderRadius: "5px",
  },
}));
