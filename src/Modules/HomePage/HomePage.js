import React, { Fragment, useContext } from "react";
import HomePageBanner from "./HomePageBanner";
import HomePageSection from "./HomePageSection";
import HomePageNewRelease from "./HomePageNewRelease";
import useStore from "Store/StoreContext";
import AuthContext from "Store/AuthContext";

const HomePage = () => {
  const user = useContext(AuthContext);

  
    return (
      <Fragment>
        <HomePageBanner />
        <HomePageSection />
      </Fragment>
    );
  
};

export default HomePage;
