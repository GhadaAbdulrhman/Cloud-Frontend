import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import _, {debounce} from 'lodash';
import CatalogFilter from "./CatalogFilter";
import CatalogList from "./CatalogList";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import useStore from "Store/StoreContext";

const Catalog = () => {
  const { typeFilter } = useStore();
  const [subCategory, setSubCategory] = useState("");

  const [valueMin, setValueMin] = useState(5);
  const [valueMax, setValueMax] = useState(150);
  const [searchQuery, setSearchQuery] = useState("");
  const [color, setColor] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  const submitFilter = () => {
    setLoading(true);
    let url = `${process.env.REACT_APP_SERVER_ENDPOINT}/products`;

    // Check each condition and append query parameters if they are true
    if (typeFilter) {
      if (typeFilter != "all") {
        url += `/filter/${typeFilter}`;
      }
    }

    if (subCategory) {
      url.includes("filter")
        ? (url += `/${subCategory}`)
        : (url += `/filter/${subCategory}`);
    }

    if (color) {
      // If there are already parameters in the URL, use '&' for subsequent parameters
      url.includes("filter")
        ? (url += url.includes("?") ? `&color=${color}` : `?color=${color}`)
        : (url += url.includes("?")
            ? `/filter/&color=${color}`
            : `/filter/?color=${color}`);
    }
    if (searchQuery) {
      // If there are already parameters in the URL, use '&' for subsequent parameters
      url.includes("filter")
        ? (url += url.includes("?")
            ? `&searchQuery=${searchQuery}`
            : `?searchQuery=${searchQuery}`)
        : (url += url.includes("?")
            ? `/filter/&searchQuery=${searchQuery}`
            : `/filter/?searchQuery=${searchQuery}`);
    }

    if (valueMax) {
      url.includes("filter")
        ? (url += url.includes("?")
            ? `&maxPrice=${valueMax}`
            : `?maxPrice=${valueMax}`)
        : (url += url.includes("?")
            ? `/filter/&maxPrice=${valueMax}`
            : `/filter/?maxPrice=${valueMax}`);
    }

    if (valueMin) {
      url.includes("filter")
        ? (url += url.includes("?")
            ? `&minPrice=${valueMin}`
            : `?minPrice=${valueMin}`)
        : (url += url.includes("?")
            ? `/filter/&minPrice=${valueMin}`
            : `/filter/?minPrice=${valueMin}`);
    }
    console.log("new url is ", url);
    getProducts(url);
  };

  const getProducts = async (url) => {
    try {
      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (err) {
      console.log("err is ", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    console.log("inside useEffect of typeFilter ");
    setColor("");
    setSearchQuery("");
    setValueMax(150);
    setValueMin(5);
    setSubCategory("");
    submitFilter();
  }, [typeFilter]);

  useEffect(() => {
    console.log("inside useEffect of typeFilter subCategory");
    let url = `${process.env.REACT_APP_SERVER_ENDPOINT}/products`;
    console.log("typeFilter is ", typeFilter);

    if (typeFilter) {
      if (typeFilter != "all") {
        url += `/filter/${typeFilter}`;
      }
    }

    if (subCategory) {
      url.includes("filter")
        ? (url += `/${subCategory}`)
        : (url += `/filter/${subCategory}`);
    }

    console.log("new url is ", url);
    getProducts(url);
  }, [typeFilter, subCategory]);


  const handleScroll = debounce(() => {
    // Fetch data based on scroll position
  }, 200);
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Row className="m-0">
      <Col className="mb-3" xs={12} lg={3}>
        <CatalogFilter
          submitFilter={submitFilter}
          subCategory={subCategory}
          setSubCategory={setSubCategory}
          valueMin={valueMin}
          setValueMin={setValueMin}
          valueMax={valueMax}
          setValueMax={setValueMax}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          color={color}
          setColor={setColor}
          typeFilter={typeFilter}
        />
      </Col>
      <Col className="mb-3" xs={12} lg={9}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
          </div>
        ) : (
          <CatalogList products={products} />
        )}
      </Col>
    </Row>
  );
};

export default Catalog;
