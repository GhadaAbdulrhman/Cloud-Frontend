import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonRound from "Components/Buttons/ButtonRound";
import { useHistory } from "react-router-dom";
import useStore from "Store/StoreContext";

const SearchField = (props) => {
  const { searchQuery, setSearchQuery } = props;

  const classes = useStyles();

  return (
    <InputGroup className="align-items-center" style={{ marginTop: "1rem" }}>
      <Form.Control
        as="input"
        className={classes.inputField}
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </InputGroup>
  );
};

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    borderRadius: "30px!important",
    backgroundColor: theme.colors.cream,
    boxShadow: "none!important",
    fontWeight: "600",
    height: 40,
    "&:focus": {
      backgroundColor: theme.colors.cream,
    },
  },
  buttonContainer: {
    position: "absolute",
    right: 4,
    zIndex: "1111",
  },
}));

export default SearchField;
