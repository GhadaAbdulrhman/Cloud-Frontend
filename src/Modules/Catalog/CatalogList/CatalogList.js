import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Product from "Components/Product";
import CatalogListSortBy from "./CatalogListSortBy";
import CatalogListPagination from "./CatalogListPagination";
const CatalogList = (props) => {
  const { id } = props;

  const [sort, setSort] = useState("newest");

  const handleSort = (value) => {
    setSort(value);
  };

  function sortByHandle(a, b) {
    if (sort.value === "asc") {
      return parseFloat(a.price) - parseFloat(b.price);
    }
    if (sort.value === "desc") {
      return parseFloat(b.price) - parseFloat(a.price);
    }

    return null;
  }

  function capitalize(product) {
    return product.category.charAt(0).toUpperCase() + product.category.slice(1);
  }

  return (
    <div>
      <Row>
        <Col className="mb-4" xs={12}>
          <CatalogListSortBy handleSort={handleSort} value={sort} />
        </Col>
        {props.products
          ?.sort((a, b) => sortByHandle(a, b))
          ?.map((product, index) => {
            return (
              <Col
                key={index * Math.random()}
                className="mb-4"
                xs={12}
                sm={6}
                md={4}
                xl={3}
              >
                <Product
                  link={product._id}
                  img={product.img}
                  name={product.name}
                  price={product.price}
                />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default CatalogList;
