/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import HomeIcon from '@material-ui/icons/Home';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks({ isSignIn }) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Link to="/home" className={classes.navLink2} >
            <HomeIcon className={classes.icons} /> TRANG CHỦ
          </Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Link to="/menu" className={classes.navLink2}>
            <LocalBarIcon className={classes.icons} /> DANH SÁCH THỨC UỐNG
          </Link>
        </Button>
      </ListItem>
      {isSignIn ?
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="NGUYỄN VĂN A"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={AccountCircleIcon}
            dropdownList={[
              <Link to="/" className={classes.dropdownLink}>
                Hồ sơ cá nhân
            </Link>,
              <Link to="/" className={classes.dropdownLink}>
                Đăng xuất
            </Link>

            ]}
          />
        </ListItem>
        :
        //Not Sign in
        <>
          <ListItem className={classes.listItem}>
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              <Link to="/signin" className={classes.navLink2}>
                ĐĂNG NHẬP
          </Link>
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              <Link to="/signup" className={classes.navLink2}>
                ĐĂNG KÝ
          </Link>
            </Button>
          </ListItem>
        </>

      }
    </List>
  );
}
