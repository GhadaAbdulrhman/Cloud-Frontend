import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ProductViewer from "Components/Carousel/ProductViewer";
import ProductSelection from "./ProductSelection/";
import { useParams } from "react-router-dom";
import Search from "Utils/searchInArray";
import useStore from "Store/StoreContext";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const Product = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    let url = `${process.env.REACT_APP_SERVER_ENDPOINT}/products/product/${id}`;
    const getProduct = async (url) => {
      await axios
        .get(url)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((err) => {
          console.log("err is ", err);
        });
    };
    getProduct(url);
  }, []);
  return product ? (
    <Container fluid="md">
      <Row className="mt-4 ">
        <Col xs={12} lg={6}>
          <ProductViewer img={product.img} id={id} />
        </Col>
        <Col xs={12} lg={6}>
          <ProductSelection current={product} title={product.name} id={id} />
        </Col>
      </Row>
      <Row className={clsx(classes.h5div)}>
        <Col>
          <h5 className={clsx(classes.h5)} style={{ color: "#555" }}>
            Name: <span style={{ color: "black" }}> {product.name}</span>
          </h5>
          <h5 className={clsx(classes.h5)} style={{ color: "#555" }}>
            Description :<span style={{ color: "black" }}>{product.desc}</span>
          </h5>
          <h5 className={clsx(classes.h5)} style={{ color: "#555" }}>
            Color: <span style={{ color: "black" }}>{product.color}</span>
          </h5>
        </Col>
        <Col>
          <h5 className={clsx(classes.h5)} style={{ color: "#555" }}>
            Price: <span style={{ color: "black" }}>{product.price}$</span>
          </h5>
          <h5 className={clsx(classes.h5)} style={{ color: "#555" }}>
            Category:<span style={{ color: "black" }}> {product.category}</span>
          </h5>
          <h5 className={clsx(classes.h5)} style={{ color: "#555" }}>
            Sub Category:
            <span style={{ color: "black" }}> {product.subCategory}</span>
          </h5>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid="md"></Container>
  );
};

const useStyles = makeStyles((theme) => ({
  h5: {
    backgroundColor: "rgb(255 255 255) !important",
    padding: " 10px",
    margin: " 10px",
    borderRadius: " 15px",
    color: "rgb(85, 85, 85)",
    border: "2px solid rgb(64, 50, 52)",
    transition: ".5s",
    "&:hover": {
      transform: "scale(1.05)" /* Equal to scaleX(0.7) scaleY(0.7) */,
    },
  },
}));

export default Product;
