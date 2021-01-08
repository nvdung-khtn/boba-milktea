import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import axiosInstance from 'services/api';
import routes from 'routes/index'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [authTokens, setAuthTokens] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate()


  const setTokens = (data) => {
    console.log(`setTokens`, data);
    if (data) {
      localStorage.setItem('token', data);
      setAuthTokens(data);
      return;
    }
  };

  const currentTokens = localStorage.getItem('token');
  console.log('currentToken');
  if (!authTokens) setTokens(currentTokens);
  const routing = useRoutes(routes());

  const setUser = (data) => {
    console.log('setUserInfor', data);
    if (data) {
      localStorage.setItem('__user', JSON.stringify(data));
      setUserInfo(data);
    }
  };
  return (
    <Provider store={store}>
      {routing}
    </Provider>

  );
}

export default App;
