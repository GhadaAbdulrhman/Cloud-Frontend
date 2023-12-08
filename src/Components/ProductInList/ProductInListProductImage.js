import React from "react";
import { makeStyles } from "@material-ui/styles";

const ProductInListProductImage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.imgContainer}>
      <img
        className="w-100 h-100 border-rounded"
        src={`data:image/jpeg;base64,${props.img}`}
        alt="product img"
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    height: 170,
    ["@media (max-width:575.5px)"]: {
      height: 300,
      marginBottom: 16,
    },
    ["@media (max-width:447px)"]: {
      height: 200,
      marginBottom: 16,
    },
  },
}));

export default ProductInListProductImage;
