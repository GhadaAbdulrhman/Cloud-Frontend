import React, { Fragment, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { makeStyles, useTheme } from "@material-ui/styles";
import IconText from "Components/IconText";
import NavLink from "../Components/NavLink";
import clsx from "clsx";
import UseStore from "Store/StoreContext";
import { withRouter } from "react-router-dom";
import AuthContext from "Store/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  const history = useHistory();
  const { cart, typeFilter, setTypeFilter } = UseStore();
  const classes = useStyles();

  const userContext = useContext(AuthContext);
  const { userRole } = userContext.user;

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

  const RegularUserLinks = () => {
    return (
      <Fragment>
        <p
          onClick={() => {
            onRegularLinksClick("all");
          }}
          className={clsx(classes.navLink)}
        >
          All
        </p>
        <p
          onClick={() => {
            onRegularLinksClick("men");
          }}
          className={clsx(classes.navLink)}
        >
          Men
        </p>
        <p
          className={`${clsx(classes.navLink)} mr-2 ml-2`}
          onClick={() => {
            onRegularLinksClick("women");
          }}
        >
          Women
        </p>
        <p
          className={clsx(classes.navLink)}
          onClick={() => {
            onRegularLinksClick("kids");
          }}
        >
          Kids
        </p>
      </Fragment>
    );
  };

  const renderRegularUserLinks = () => {
    if (userRole?.toLowerCase() === "regular") {
      return <RegularUserLinks />;
    }
    return null;
  };

  const renderDesignerLinks = () => {
    if (userRole?.toLowerCase() === "designer") {
      return (
        <Fragment>
          <RegularUserLinks />
          <NavLink linkAdress="/my-designs">My Designs</NavLink>
        </Fragment>
      );
    }
    return null;
  };
  const renderAdminLinks = () => {
    if (userRole?.toLowerCase() === "admin") {
      return (
        <Fragment>
          <RegularUserLinks />
          <NavLink linkAdress="/add-product">Add Product</NavLink>
          <NavLink linkAdress="/pending-designs">Pending Designs</NavLink>
        </Fragment>
      );
    }
    return null;
  };

  const handleLogut = () => {
    userContext.logout();
  };
  if (userRole) {
    return (
      <Navbar className={classes.root} bg="light" expand="lg">
        <Container className="p-0" fluid="fluid">
          <Navbar.Collapse id="basic-navbar-nav">
            <Row className="w-100 m-0" xs={12}>
              <Col
                className="align-items-center 
              justify-content-lg-start 
              justify-content-xl-start 
            justify-content-center 
            d-flex"
                xs={12}
                lg={3}
              >
                {userRole.toLowerCase() === "admin" ? (
                  <NavLink linkAdress="/">
                    <img
                      src={`https://s3.amazonaws.com/thumbnails.venngage.com/template/fc8535df-be09-4c80-8ea5-a69a34b2318e.png`}
                      width={50}
                      height={50}
                    />
                  </NavLink>
                ) : (
                  <NavLink linkAdress="/">
                    <img
                      src={`https://s3.amazonaws.com/thumbnails.venngage.com/template/fc8535df-be09-4c80-8ea5-a69a34b2318e.png`}
                      width={50}
                      height={50}
                    />
                  </NavLink>
                )}
              </Col>
              <Col className="align-items-center d-flex" xs={12} lg={6}>
                <Row
                  className="d-flex m-0 
            position-relative
            justify-content-xl-center 
        justify-content-lg-center 
        justify-content-md-center 
        justify-content-sm-center 
        justify-content-start w-100"
                >
                  {renderRegularUserLinks()}
                  {renderAdminLinks()}
                  {renderDesignerLinks()}
                </Row>
              </Col>
              <Col
                className="align-items-center 
              justify-content-center 
              justify-content-lg-end 
              justify-content-xl-end 
            flex-column
            flex-xl-row
            flex-lg-row
            d-flex"
                xs={12}
                lg={3}
              >
                {(userRole == "regular" || userRole == "designer")  && (
                  <NavLink linkAdress="/edit-profile">
                    <IconText
                      icon="/icons/user/userGrey.svg"
                      text="Edit Profile"
                    />
                  </NavLink>
                )}
                <div
                  onClick={handleLogut}
                  className="mr-2"
                  style={{ cursor: "pointer" }}
                >
                  <IconText icon="/icons/user/userGrey.svg" text="Logout" />
                </div>
                {userRole == "regular" && (
                  <NavLink linkAdress="/cart">
                    <IconText
                      cart={cart.length}
                      icon="/icons/cart/cartGrey.svg"
                      text="Cart"
                    />
                  </NavLink>
                )}
              </Col>
            </Row>
          </Navbar.Collapse>
        </Container>
        <div className="d-flex justify-content-center w-100">
          <Navbar.Toggle
            className={clsx(classes.toggleButton, {
              "position-absolute ": true,
            })}
            aria-controls="basic-navbar-nav"
          />
        </div>
      </Navbar>
    );
  } else {
    return (
      <Navbar className={classes.root} bg="light" expand="lg">
        <div className="d-flex justify-content-center w-100">
          <Navbar.Toggle
            className={clsx(classes.toggleButton, {
              "position-absolute ": true,
            })}
            aria-controls="basic-navbar-nav"
          />
        </div>
      </Navbar>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent!important",
    flexFlow: "column",
    padding: "0 6px ",
  },
  toggleButton: {
    top: 4,
    right: 2,
    lineHeight: "28px",
    zIndex: "1111",
    height: 35,
    "& span": {
      verticalAlign: "baseline",
      height: 25,
    },
  },
  navLink: {
    color: "#687774!important",
    display: "block",
    padding: "0.5rem 1rem",
    fontSize: "18px",
    lineHeight: "28px",
    cursor: "pointer",
  },
}));

export default withRouter(Header);
