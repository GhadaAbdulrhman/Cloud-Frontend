import ButtonBlock from "Components/Buttons/ButtonBlock";
import InputField from "Components/InputField";
import Checkbox from "Components/Switches/Checkbox";
import AuthContext from "Store/AuthContext";
import axios from "axios";
import clsx from "clsx";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

const AddProduct = () => {
  const userContext = useContext(AuthContext);
  const { id, userRole } = userContext.user;
  const  user = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: "",
    color: "",
    category: "",
    subCategory: "",
    price: 0,
    img: "",
    desc: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isDataNotCompleted, setIsDataNotCompleted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isValid = (word) => {
    if (word.trim()) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "img") {
      setProduct((oldProduct) => {
        return { ...oldProduct, img: e.target.files[0] };
      });
    } else {
      setProduct((oldProduct) => {
        return { ...oldProduct, [e.target.name]: e.target.value };
      });
    }
  };

  const handleAddDesign = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("img", product.img);
    formData.append("name", product.name);
    formData.append("color", product.color);
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory);
    formData.append("price", product.price);
    formData.append("desc", product.desc);
    formData.append("userRole", userRole);

    axios
      .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setProduct({
          name: "",
          color: "",
          category: "",
          subCategory: "",
          price: 0,
          img: "",
          desc: "",
        });
        setIsSuccess(true); 
      })
      .catch((error) => {
        console.error("Error adding product", error);
      });
  };

  const CategoryChoice = () => {
    const categoryOptions = [
      { id: 1, label: "Men", value: "men" },
      { id: 2, label: "Women", value: "women" },
      { id: 3, label: "Kids", value: "kids" },
    ];
    return (
      <Dropdown isOpen={isOpen} toggle={toggle} className="mt-3">
        <DropdownToggle
          style={{
            backgroundColor: "#403234",
            borderColor: "transparent",
          }}
          caret
        >
          {product.category ? product.category : "Category"}
        </DropdownToggle>
        <DropdownMenu>
          {categoryOptions.map((option) => (
            <DropdownItem
              key={option.id}
              onClick={() =>
                setProduct((prevProd) => ({
                  ...prevProd,
                  category: option.value,
                }))
              }
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  const SubCategoryChoice = () => {
    const subCategoryOptions = [
      { id: 1, label: "Pants", value: "pants" },
      { id: 2, label: "Tops&Tees", value: "tops&tees" },
      { id: 3, label: "Jackets&Coats", value: "jackets&coats" },
      { id: 4, label: "Shoes", value: "shoes" },
      { id: 5, label: "Accessories", value: "accessories" },
      { id: 6, label: "Hoodies&Sweatshirts", value: "hoodies&sweatshirts" },
      { id: 7, label: "Shirts", value: "shirts" },
    ];
    return (
      <Dropdown isOpen={isOpen} toggle={toggle} className="mt-3">
        <DropdownToggle
          style={{
            backgroundColor: "#403234",
            borderColor: "transparent",
          }}
          caret
        >
          {product.subCategory ? product.subCategory : "Sub Category"}
        </DropdownToggle>
        <DropdownMenu>
          {subCategoryOptions.map((option) => (
            <DropdownItem
              key={option.id}
              onClick={() =>
                setProduct((prevProd) => ({
                  ...prevProd,
                  subCategory: option.value,
                }))
              }
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  const ColorChoice = () => {
    const subCategoryOptions = [
      { id: 1, label: "Grey", value: "grey" },
      { id: 2, label: "Black", value: "back" },
      { id: 3, label: "Blue", value: "blue" },
      { id: 4, label: "Yellow", value: "yellow" },
      { id: 5, label: "Red", value: "red" },
    ];
    return (
      <Dropdown isOpen={isOpen} toggle={toggle} className="mt-3">
        <DropdownToggle
          style={{
            backgroundColor: "#403234",
            borderColor: "transparent",
          }}
          caret
        >
          {product.color ? product.color : "Color"}
        </DropdownToggle>
        <DropdownMenu>
          {subCategoryOptions.map((option) => (
            <DropdownItem
              key={option.id}
              onClick={() =>
                setProduct((prevProd) => ({
                  ...prevProd,
                  color: option.value,
                }))
              }
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };
  
  
  useEffect(() => {
    if (isDataNotCompleted || isSuccess) {
      const timer = setTimeout(() => {
        setIsDataNotCompleted(false);
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isDataNotCompleted, isSuccess]);



  if (user.user.userRole?.toLowerCase() !== "admin") {
    return (
      <h3 className="text-center"> You Are Not Authorized To See This Page</h3>
    );
  } else {
    return (
      <Fragment>
        {isDataNotCompleted && (
          <h5 style={{ color: "red", textAlign: "center" }}>
            !Please Be Sure To Fill All The Fields
          </h5>
        )}
        {isSuccess && (
          <h5 style={{ color: "green", textAlign: "center" }}>
            Product Added Successfully
          </h5>
        )}
        <div className="d-flex justify-content-center">
          <form
            onSubmit={handleAddDesign}
            className="w-50"
            style={{ minWidth: "250px" }}
          >
            <InputField
              placeholder="Name"
              value={product.name}
              name="name"
              onChange={onInputChange}
              required
            />
            <div className="d-flex justify-content-around">
              <ColorChoice />
              <CategoryChoice />
              <SubCategoryChoice />
            </div>
            <InputField
              placeholder="Price"
              value={product.price}
              name="price"
              type="number"
              onChange={onInputChange}
              required
            />
            <InputField
              placeholder="Img Link"
              name="img"
              onChange={onInputChange}
              type="file"
              accept="image/*"
              required
            />
            <InputField
              placeholder="Description"
              value={product.desc}
              name="desc"
              type="text"
              onChange={onInputChange}
              required
            />
            <ButtonBlock
              type="submit"
              text="Add Product"
              style={{ margin: "15px 0" }}
            />
          </form>
        </div>
      </Fragment>
    );
  }
};

export default AddProduct;
