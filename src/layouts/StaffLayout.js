import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinksStaff from "components/Header/HeaderLinkStaff.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import backgroundImg from "assets/img/landing-bg.jpg"


// react router
import { Outlet } from 'react-router-dom';



const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function StaffLayout(props) {
  const classes = useStyles();
  const { ...rest } = props;
  console.log("rest", props);
  return (
    <div>
      <Header
        routes={dashboardRoutes}
        brand="BOBA"
        rightLinks={<HeaderLinksStaff />}
        fixed
        color={{
          height: 400,
          color: "white",
          fontWeight: 800
        }}
        {...rest}
      />
      <Outlet />
      <Footer />
    </div>
  );
}

