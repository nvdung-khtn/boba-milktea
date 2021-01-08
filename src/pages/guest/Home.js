import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PublishIcon from '@material-ui/icons/Publish';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function Home() {
    const classes = useStyles();
    return (
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <h2 className={classes.title}>CHÀO NĂM MỚI 2021</h2>
                    <h5 className={classes.description}>
                        Chương trình khuyến mãi cực hot
          </h5>
                </GridItem>
            </GridContainer>
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <InfoArea
                            title="20/01/2021"
                            description="Miễn phí Up size với Trà sữa chân châu đường đen"
                            icon={PublishIcon}
                            iconColor="info"
                            vertical
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <InfoArea
                            title="21/01/2021"
                            description="Miễn phí thêm topping cho 1 ly  khi mua 2 ly trà sữa bất kỳ"
                            icon={PlusOneIcon}
                            iconColor="success"
                            vertical
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <InfoArea
                            title="22/01/2021"
                            description="Giảm giá 20% tất cả các thức uống"
                            icon={MonetizationOnIcon}
                            iconColor="danger"
                            vertical
                        />
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
