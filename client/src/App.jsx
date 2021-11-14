import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute.jsx';
import AuthProvider from './auth/AuthProvider.jsx';
import Login from './pages/login/Login.jsx';
import Main from './pages/main/Main.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Content from './pages/main/Content.jsx';

const App = () => {
  return (
    <Container fluid className="main-container">
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/:content'>
              <Content />
            </PrivateRoute>
            <Route exact path='/login'>
              <Login />
            </Route>
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </Container>
  );
};

export default App;
