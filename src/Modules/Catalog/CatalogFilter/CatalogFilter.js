import React from "react";
import { makeStyles } from "@material-ui/styles";
import Divider from "../Components/Divider";
import CatalogFilterDepartment from "./CatalogFilterDepartment";
import CatalogFilterColors from "./CatalogFilterColors";
import CatalogFilterPrice from "./CatalogFilterPrice";
import CatalogFilterSizes from "./CatalogFilterSizes";
import SearchField from "Components/SearchField";
import ButtonBlock from "Components/Buttons/ButtonBlock";

const CatalogFilter = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.filterContainer}>
      <CatalogFilterDepartment
        clothingTypes={clothingTypes}
        subCategory={props.subCategory}
        setSubCategory={props.setSubCategory}
        typeFilter={props.typeFilter}
      />
      <Divider />
      <CatalogFilterColors color={props.color} setColor={props.setColor} />
      <Divider />
      <CatalogFilterPrice
        valueMin={props.valueMin}
        valueMax={props.valueMax}
        setValueMin={props.setValueMin}
        setValueMax={props.setValueMax}
      />
      <Divider />
      <SearchField
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
      />
      <Divider />
      <ButtonBlock text="Submit Filters" onClick={props.submitFilter} />
    </div>
  );
};

const clothingTypes = [
  { name: "Hoodies & Sweatshirts", value: "hoodies&sweatshirts" },
  { name: "Pants", value: "pants" },
  { name: "Shirts", value: "shirts" },
  { name: "Tops&Tees", value: "tops&tees" },
  { name: "Jackets&Coats", value: "jackets&coats" },
  { name: "Shoes", value: "shoes" },
  { name: "Accessories", value: "accessories" },
];

const sizes = [41, 42, 43, 44, 45, 46, 47, 48];

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    padding: 16,
  },
}));

export default CatalogFilter;
