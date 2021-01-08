import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import stylesLayout from "assets/jss/material-kit-react/views/landingPage.js";

//component
import Loading from 'components/Loading'

//helper
import axiosInstance from 'services/api'


const useStyles = makeStyles(styles);
const useStylesLayout = makeStyles(stylesLayout);

export default function Menu() {
  const classes = useStyles();
  const classesLayout = useStylesLayout();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  //state
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    window.scrollTo({ top: 400, behavior: "smooth" })
    axiosInstance
      .get(`/drink`)
      .then((res) => {
        const data = res.data;
        setMenu(data.content);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [])


  return (
    <div className={classNames(classesLayout.main, classesLayout.mainRaised)}>
      <div className={classesLayout.container}>
        <div className={classes.section}>
          <h2 className={classes.title}>Danh sách đồng uống</h2>
          <div>
            <GridContainer>
              {isLoading ? <Loading /> :
                menu.map(drink => (
                  <GridItem key={drink.id} xs={12} sm={6} md={4}>
                    <Card plain style={{ border: "1px solid gray", paddingTop: "15px" }}>
                      <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                        <img src={drink.image} alt={drink.name} className={imageClasses} />
                      </GridItem>
                      <h4 className={classes.cardTitle}>
                        {drink.name}
                        <br />
                        <small className={classes.smallTitle}>{drink.category.categoryName}</small>
                      </h4>
                      <CardBody>
                        <p className={classes.description}>
                          {drink.description}
                        </p>
                      </CardBody>
                      <CardFooter className={classes.justifyCenter}>
                        <Button>
                          Thêm vào giỏ hàng
                    </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))
              }
            </GridContainer>
          </div>
        </div>
      </div>
    </div >
  );
}
