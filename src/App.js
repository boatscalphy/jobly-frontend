import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar.js';
import Routes from './components/Routes.js';
import UserTokenContext from './UserTokenContext';
import './App.css';

function App() {

  const [userToken, setUserToken] = useState(localStorage.getItem('jobly_token'));
  const token = (request = null) => {
    setUserToken(request)
  }


  return (
    <UserTokenContext.Provider value={{userToken, token}}>
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </UserTokenContext.Provider>
  );
}

export default App;
