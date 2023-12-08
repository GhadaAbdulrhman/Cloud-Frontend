import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Url from "Paths";
import HomePage from "Modules/HomePage";
import Auth from "Modules/Authentication";
import Catalog from "Modules/Catalog";
import Cart from "Modules/Cart";
import Checkout from "Modules/Checkout";
import Product from "Modules/Product";
import PendingDesigns from "Modules/Admin/PendingDesigns";
import MyDesigns from "Modules/MyDesigns";
import AddProduct from "Modules/Admin/AddProduct/PendingDesigns/AddProduct";
import CreateDesign from "Modules/MyDesigns/CreateDesign";
import EditProfile from "Modules/Authentication/EditProfile/EditProfile";

const Redirection = () => {
  return <Redirect to={Url.HOME} />;
};

const routes = [
  {
    path: Url.BASE,
    exact: true,
    component: Redirection,
  },
  {
    path: Url.HOME,
    exact: true,
    component: HomePage,
  },
  {
    path: Url.Auth,
    exact: true,
    component: Auth,
  },
  {
    path: Url.Product,
    exact: true,
    component: Product,
  },
  {
    path: Url.Cart,
    exact: true,
    component: Cart,
  },
  {
    path: Url.Checkout,
    exact: true,
    component: Checkout,
  },
  {
    path: Url.MyDesigns,
    exact: true,
    component: MyDesigns,
  },
  {
    path: Url.CreateDesign,
    exact: true,
    component: CreateDesign,
  },
  {
    path: Url.PendingDesigns,
    exact: true,
    component: PendingDesigns,
  },
  {
    path: Url.EditProfile,
    exact: true,
    component: EditProfile,
  },
  {
    path: Url.UpdateProduct,
    exact: true,
    component: CreateDesign,
  },
  {
    path: Url.AddProduct,
    exact: true,
    component: AddProduct,
  },
  {
    path: Url.Catalog,
    exact: true,
    component: Catalog,
  },
];

export const RenderRoutes = (switchProps = {}) => {
  return (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            component={route.component}
            redirect={route.redirect}
          />
        );
      })}
    </Switch>
  );
};
