import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function SignUpPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [formData, setFormData] = useState({ username: '', password: '', repeatPassword: '' });
  const {
    username,
    password,
    repeatPassword
  } = formData;

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const handleInputChange = name => event => {
    setFormData({ ...formData, [name]: event.target.value });
  }

  const handleSubmit = (event) => {
    console.log(event)
    event.preventDefault();
    console.log('Email:', username, 'Password: ', password, "repeat passord ", repeatPassword);
  }

  return (
    <GridContainer justify="center" style={{ position: "fixed", top: "10vh", width: "100%" }}>
      <GridItem xs={12} sm={12} md={4}>
        <Card className={classes[cardAnimaton]}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <CardHeader color="primary" className={classes.cardHeader}>
              <h4>Đăng nhập</h4>
            </CardHeader>
            <CardBody>
              <CustomInput
                labelText="Username"
                id="username"
                value={username}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: handleInputChange('username'),
                  type: "text",
                  endAdornment: (
                    <InputAdornment position="end">
                      <People className={classes.inputIconsColor} />
                    </InputAdornment>
                  )
                }}
              />
              <CustomInput
                labelText="Password"
                id="password"
                value={password}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: handleInputChange('password'),
                  type: "password",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className={classes.inputIconsColor}>
                      </Icon>
                    </InputAdornment>
                  ),
                  autoComplete: "off"
                }}
              />
              <CustomInput
                labelText="Repeat Password"
                id="repeatPassword"
                value={repeatPassword}

                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: handleInputChange('repeatPassword'),
                  type: "password",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className={classes.inputIconsColor}>
                      </Icon>
                    </InputAdornment>
                  ),
                  autoComplete: "off"
                }}
              />
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              <Button simple color="primary" size="lg" type="submit">
                Đăng ký
              </Button>
            </CardFooter>
          </form>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
