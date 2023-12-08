import React, { useContext, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import useStore from "Store/StoreContext";
import ButtonBlock from "Components/Buttons/ButtonBlock";
import { Link } from "react-router-dom";
import Url from "Paths";
import DesignedProduct from "./DesignedProduct";
import AuthContext from "Store/AuthContext";

const MyDesigns = () => {
  const user = useContext(AuthContext);
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const fetchMyDesigns = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/products/approved-designer-products`
        );

        console.log("this is the designs products ", response);
        
        setDesigns(response.data.products);
        
      } catch (error) {
        console.error("Error fetching designs", error);
      }
    };

    fetchMyDesigns();
  }, []);

  if (user.user.userRole?.toLowerCase() !== "designer") {
    return (
      <h3 className="text-center"> You Are Not Authorized To See This Page</h3>
    );
  } else {
    return (
      <div className="pr-5 pl-5">
        <h3 className="text-center mb-3" style={{ fontWeight: "700" }}>
          My Designs
        </h3>
        <Row className=" d-flex justify-content-center">
          {designs.map((design, index) => (
            <Col
              key={index}
              className="mb-4 p-2"
              xs={12}
              sm={6}
              md={4}
              xl={3}
              style={{ borderRadius: "5px" }}
            >
              <DesignedProduct
                link={design._id}
                img={design.img}
                name={design.name}
                price={design.price}
              />
            </Col>
          ))}
        </Row>
        <Row className="d-flex justify-content-center mt-2 mb-2 w-25">
          <ButtonBlock
            as={Link}
            to={Url.CreateDesign}
            fontWeight="400"
            text="Create Design"
          />
          
        </Row>
      </div>
    );
  }
};

export default MyDesigns;
