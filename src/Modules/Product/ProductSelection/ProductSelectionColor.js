import React from "react";
import ButtonColor from "Components/Buttons/ButtonColor";
import { Button } from "react-bootstrap";
import styles from './product.module.css'

const ProductSelectionSize = ({ color, setColor }) => {
  return (
    <div className="mt-3">
      <h4>Color</h4>
      <div
        className={`d-flex justify-content-center mt-2 ${styles.btns_div}`}
        style={{ marginBottom: "5px" }}
        >
        <ButtonColor name="red" background="red" onClick={setColor} />
        <ButtonColor name="yellow" background="yellow" onClick={setColor} />
        <ButtonColor name="blue" background="blue" onClick={setColor} />
        <ButtonColor name="black" background="black" onClick={setColor} />
        <ButtonColor name="grey" background="grey" onClick={setColor} />
      </div>
        <h4>Added Color</h4>
      <Button
        style={{
          backgroundColor: color,
          width: "30px",
          height: "30px",
          borderColor: "transparent",
        }}
        className="rounded-circle"
      />
    </div>
  );
};

export default ProductSelectionSize;
