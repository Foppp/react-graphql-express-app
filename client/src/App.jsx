import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Content from './pages/main/Content.jsx';
import Home from './pages/main/Home.jsx';
import Login from './pages/login/Login.jsx';

import './App.css';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":content" element={<Content />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}


export default App;

