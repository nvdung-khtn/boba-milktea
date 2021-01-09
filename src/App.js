import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import axiosInstance from 'services/api';
import routes from 'routes/index'
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux'
import { setUser } from 'myRedux/actions/authAction';
import { isAuthenticated } from 'services/auth'

function App(props) {
  let userRole = undefined;
  const jwt = isAuthenticated();

  if (jwt) {//check localstorage
    userRole = jwt.userInfo.role;
    const { username } = jwt.userInfo
    props.setUser(username, userRole);
  }

  const routing = useRoutes(routes(userRole));

  return (
    <>
      { routing}
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  setUser: (username, userRole) => dispatch(setUser(username, userRole))
})

export default connect(null, mapDispatchToProps)(App);
