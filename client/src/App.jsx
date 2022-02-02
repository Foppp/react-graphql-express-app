import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import PrivateRoute from './auth/PrivateRoute.jsx'
import AuthProvider from './auth/AuthProvider.jsx'
import Content from './pages/main/Content.jsx';
import Home from './pages/main/Home.jsx';
import Login from './pages/login/Login.jsx';

import { theme } from './assets/styles/theme.js'
import './App.css';
  
const App = () => {

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <AuthProvider>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />}>
          <Route path=":content" element={<Content />} />
        </Route>
        </Route>
      </Routes>
      </AuthProvider>
      </Router>
      </ThemeProvider>
  );
}


export default App;

