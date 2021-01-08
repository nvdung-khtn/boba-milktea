import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import Loading from 'components/Loading';
import image from "assets/img/bg7.jpg";
import axiosInstance from "services/api";


const useStyles = makeStyles(styles);

export default function SignInPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false)
  const {
    username,
    password
  } = formData;

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const handleInputChange = name => event => {
    console.log(event)
    setFormData({ ...formData, [name]: event.target.value });
  }

  const handleSubmit = (event) => {
    setIsDisableBtn(true);
    setIsLoading(true)
    event.preventDefault();
    console.log('Email:', username, 'Password: ', password);
    signIn(username, password)
  }

  const signIn = (username, password) => {
    axiosInstance
      .post(`/sign-in`, { email: username, password })
      .then((res) => {
        const data = res.data;
        localStorage.setItem(data, res.data)
        setIsLoading(false);
        setRedirect(true);
      })
      .catch((err) => {
        setIsDisableBtn(false);
        setIsLoading(false);
      });
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
                id="first"
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
                id="pass"
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
            </CardBody>

            <CardFooter className={classes.cardFooter}>
              <Button color="primary" size="lg" type="submit">
                Đăng nhập  {isLoading ? <Loading width="50px" /> : ''}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </GridItem>
      {redirect ? <Navigate to='/home' exact /> : ''}
    </GridContainer>
  );
}
