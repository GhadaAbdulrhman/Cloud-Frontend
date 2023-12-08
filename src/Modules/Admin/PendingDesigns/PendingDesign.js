import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Url from "Paths";
import styles from "./pendingDesign.module.css";
import axios from "axios";

const PendingDesign = (props) => {
  const classes = useStyles();
  const { _id, name, price, img } = props.design;

  console.log("props are ", props);
  const approveDesign = async () => {
    await axios.put(`${process.env.REACT_APP_SERVER_ENDPOINT}/products/${_id} `, {
      status: "approved",
    });
    props.generatePendingProducts();
  };
  const declineDesign = async () => {
    await axios.delete(`${process.env.REACT_APP_SERVER_ENDPOINT}/products/${_id}`);
    props.generatePendingProducts();
  };
  return (
    <div
      className={clsx(classes.product, {
        "w-100 h-100 ": true,
      })}
    >
      <img
        style={{ boxShadow: "0px 0px 3px 1px #cbcbcb" }}
        className="w-100 border-rounded p-3"
        src={`data:image/jpeg;base64,${img}`}
        alt="Product Img"
      />
      <div
        className={`${classes.textContainer} d-flex justify-content-between mt-2 mb-2 mr-1 ml-1`}
      >
        <h5 className="mt-1">{name}</h5>
        <h6 className="mt-2">{price}$</h6>
      </div>
      <div className={styles.btns_div}>
        <button
          onClick={approveDesign}
          style={{
            "background-color": "green",
          }}
        >
          Approve
        </button>
        <button
          onClick={declineDesign}
          style={{
            "background-color": "red",
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  product: {
    height: 200,
    "& img": {
      borderRadius: "6px",
      height: "250px",
    },
    "&:hover": {
      textDecoration: "none",
    },
  },
  textContainer: {
    color: "#555",
    fontWeight: "600",
    "& h5": {
      fontSize: "18px",
      lineHeight: "18px",
    },
    "& h6": {
      fontSize: "16px",
      lineHeight: "18px",
    },
  },
}));

export default PendingDesign;
