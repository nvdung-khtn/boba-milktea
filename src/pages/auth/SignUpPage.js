import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
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
import axiosInstance from "services/api";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignUpPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [formData, setFormData] = useState({ username: '', password: '', repeatPassword: '' });
  const [errors, setErrors] = useState('');
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const [alert, setAlert] = useState(0);
  const {
    username,
    password,
    repeatPassword
  } = formData;

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const classes2 = useStyles2();
  const { ...rest } = props;

  const handleInputChange = name => event => {
    setFormData({ ...formData, [name]: event.target.value });
  }

  const handleValidation = (name) => {
    let errors = {};
    let formIsValid = true;
    //Name
    if (!username) {
      formIsValid = false;
      errors["username"] = "không được để trống";
    } else if (username.length < 6) {
      errors["username"] = "tối thiểu 6 kí tự";
    } else if (!username.match(/^[a-zA-Z0-9]+$/)) {
      formIsValid = false;
      errors["username"] = "chỉ chứa chữ và số";
    }
    if (!password) {
      formIsValid = false;
      errors["password"] = "không được để trống";
    } else {
      if (password.length < 6) {
        formIsValid = false;
        errors["password"] = " tối thiểu 6 ký tự";
      } else if (repeatPassword !== password) {
        formIsValid = false;
        errors["repeatPassword"] = "không khớp";
      }
    }
    setErrors(errors)
    return formIsValid;
  }

  const handleSubmit = (event) => {
    console.log(event)
    setIsDisableBtn(true);
    event.preventDefault();
    console.log('Email:', username, 'Password: ', password, "repeat passord ", repeatPassword);
    if (handleValidation()) {
      signUp(username, password);
    } else {
      setIsDisableBtn(false);
    }
  }

  const signUp = (username, password) => {
    //axios.post('http://localhost:8080/sign-up', { username, password })
    axiosInstance
      .post(`/sign-up`, { username, password })
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setAlert(1)
        }
      })
      .catch((err) => {
        setAlert(2)
        setIsDisableBtn(false);
      });
  }

  return (
    <GridContainer justify="center" style={{ position: "fixed", top: "10vh", width: "100%" }}>
      <GridItem xs={12} sm={12} md={4}>
        <Card className={classes[cardAnimaton]}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <CardHeader color="primary" className={classes.cardHeader}>
              <h4>Đăng ký</h4>
            </CardHeader>
            <CardBody>
              <CustomInput
                labelText={errors['username'] ? ("Tên đăng nhập " + errors['username']) : "Username"}
                error={errors['username']}
                id="username"
                value={username}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onBlur: handleValidation,
                  onChange: handleInputChange('username'),
                  type: "text",
                }}
              />
              <CustomInput
                labelText={errors['password'] ? ("Mật khẩu " + errors['password']) : "Mật khẩu"}
                error={errors['password']}
                id="password"
                value={password}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onBlur: handleValidation,
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
                labelText={errors['repeatPassword'] ? ("Nhập lại mật khẩu " + errors['repeatPassword']) : "Nhập lại mật khẩu"}
                error={errors['repeatPassword']}
                id="repeatPassword"
                value={repeatPassword}

                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onBlur: handleValidation,
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
            <div>
              {alert === 2 ?
                <Alert variant="filled" severity="error">
                  Tên đăng nhập đã tồn tại, vui lòng chọn tên khác
                </Alert>
                : (alert === 1 ? <Alert variant="filled" severity="success">
                  Đăng ký thành công !
                </Alert> : '')
              }
            </div>
            <CardFooter className={classes.cardFooter}>
              <Button color="primary" size="lg" type="submit" disabled={isDisableBtn}>
                Đăng ký
                </Button>
            </CardFooter>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Link to="/signin">Đăng nhập</Link>
            </div>

          </form>
        </Card>
      </GridItem>
    </GridContainer >
  );
}
