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
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import backgroundImg from "assets/img/landing-bg.jpg"
import banner from "assets/img/banner.png"

// react router
import { Outlet } from 'react-router-dom';



const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="BOBA"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
          fontWeight: 800
        }}
        {...rest}
      />
      <Parallax filter image={banner}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Boba Xin kính chào quý khách</h1>
              <h4>
                227 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Outlet />
      <Footer />
    </div>
  );
}
