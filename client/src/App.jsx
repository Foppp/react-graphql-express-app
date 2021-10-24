import React from 'react';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './auth/PrivateRoute.jsx';
import AuthProvider from './auth/AuthProvider.jsx';
import Login from './pages/Login.jsx';
import Main from './pages/Main.jsx';
import MenuPages from './pages/MenuPages.jsx';

const App = () => {
  
  return (
    <Container>
      <AuthProvider>
      <Router>
          <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <PrivateRoute exact path='/'>
            <Main />
            </PrivateRoute>
            <PrivateRoute exact path='/:page'>
            <MenuPages />
          </PrivateRoute>
        </Switch>
      </Router>
      </AuthProvider>
    </Container>
  );
};

export default App;
