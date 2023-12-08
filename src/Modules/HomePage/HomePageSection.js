import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SectionBlock from "Components/SectionBlock/SectionBlock";
import Url from "Paths";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useStore from "Store/StoreContext";

const HomePageSection = () => {
  const history = useHistory();
  const { typeFilter, setTypeFilter } = useStore();

  const onRegularLinksClick = (e) => {
    console.log(e);
    if (typeFilter == e) {
      setTypeFilter("");
      setTimeout(() => {
        setTypeFilter(e);
      }, 50);
    } else {
      setTypeFilter(e);
    }
    history.push("/clothingstore/products");
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col className="mb-3" xs={12} md={4}>
          <SectionBlock
            onClick={() => {
              onRegularLinksClick("men");
            }}
            text="Men"
            img="/images/homepage/menSection.png"
          />
        </Col>
        <Col className="mb-3" xs={12} md={4}>
          <SectionBlock
            onClick={() => {
              onRegularLinksClick("women");
            }}
            text="Women"
            img="/images/homepage/womenSection.png"
          />
        </Col>
        <Col className="mb-3" xs={12} md={4}>
          <SectionBlock
            onClick={() => {
              onRegularLinksClick("kids");
            }}
            text="Kids"
            img="/images/homepage/kidSection.png"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePageSection;
