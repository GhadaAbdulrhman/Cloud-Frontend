import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ProductInList from "Components/ProductInList";
import CartCheckout from "./CartCheckout";
import UseStore from "Store/StoreContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Url from "Paths";
import AuthContext from "Store/AuthContext";

const Cart = () => {
  const { cart, setSubTotal } = UseStore();
  const  user = useContext(AuthContext);

  useEffect(() => {
    let localSubTotal = 0;
    cart.map((product) => {
      const quantity = product.quantity;
      const price = Number(product.productId.price) * Number(quantity);
      console.log("product.productId is ", product.productId);
      console.log("price is ", price);
      console.log("quantity is ", quantity);
      localSubTotal += price;
    });
    setSubTotal(localSubTotal.toFixed(2));
  });

  
  if (user.user.userRole?.toLowerCase() !== "regular") {
    return (
      <h3 className="text-center"> You Are Not Authorized To See This Page</h3>
    );
  } else {
    return (
      <Container fluid>
        <Row className="mt-3 ">
          <Col className="mb-3" xs={12}>
            <h2>Shopping Cart</h2>
          </Col>
        </Row>
        <Row className="mt-3 cart">
          <Col className="mb-3" xs={12} md={8}>
            <ul className="list-group">
              {cart.length > 0 ? (
                cart.map((product, index) => {
                  console.log("product is ", product);
                  return (
                    <li
                      className="list-group-item p-0 mb-3 border-0 "
                      key={product.productId.price * Math.random()}
                    >
                      <ProductInList
                        product={product}
                        productId={product._id}
                      />
                    </li>
                  );
                })
              ) : (
                <h2>There No Items In The Cart</h2>
              )}
            </ul>
          </Col>
          <Col className="mb-3" xs={12} md={4}>
            <CartCheckout />
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Cart;
