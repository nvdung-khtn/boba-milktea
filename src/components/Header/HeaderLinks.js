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
import DescriptionIcon from '@material-ui/icons/Description';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { CUSTOMER, STAFF } from 'configs/static'
//redux
import { connect } from 'react-redux'
import { signout } from 'services/auth'
import { clearUser } from 'myRedux/actions/authAction'

const useStyles = makeStyles(styles);


function HeaderLinks({ username, userRole, clearUser }) {
  const classes = useStyles();

  const handleSignOut = (e) => {
    signout(() => {
      clearUser();
    })
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to="/home" className={classes.navLink2} >
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <HomeIcon className={classes.icons} /> TRANG CHỦ
        </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/menu" className={classes.navLink2}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <LocalBarIcon className={classes.icons} />THỨC UỐNG
        </Button>
        </Link>
      </ListItem>

      {userRole === CUSTOMER ? //is Customer
        <ListItem className={classes.listItem}>
          <Link to="/history-purchase" className={classes.navLink2}>
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              <DescriptionIcon className={classes.icons} /> ĐƠN HÀNG
        </Button>
          </Link>
        </ListItem>
        : ''
      }
      {userRole === STAFF ? // is staff
        <>
          <ListItem className={classes.listItem}>
            <Link to="/" className={classes.navLink2}>
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                <MonetizationOnIcon className={classes.icons} /> DOANH THU
              </Button>
            </Link>
          </ListItem>
        </>
        : ''
      }

      {userRole !== undefined ? //Signed
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText={`  ${username}  `}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={AccountCircleIcon}
            dropdownList={[
              <Link to="/" className={classes.dropdownLink}>
                Hồ sơ cá nhân
                  </Link>,
              <div className={classes.dropdownLink} onClick={handleSignOut}>
                Đăng xuất
              </div>

            ]}
          />
        </ListItem>
        : // Not sign in
        <>
          <ListItem className={classes.listItem}>
            <Link to="/signin" className={classes.navLink2}>
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                ĐĂNG NHẬP
              </Button>
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/signup" className={classes.navLink2}>
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                ĐĂNG KÝ
              </Button>
            </Link>
          </ListItem>

        </>
      }

    </List>
  );
}
const mapStateToProps = (state) => ({
  username: state.auth.username,
  userRole: state.auth.userRole
})

const mapDispatchToProps = (dispatch) => ({
  clearUser: () => dispatch(clearUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLinks)