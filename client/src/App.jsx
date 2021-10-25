import React from 'react';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute.jsx';
import AuthProvider from './auth/AuthProvider.jsx';
import Login from './pages/Login.jsx';
import Main from './pages/Main.jsx';
import MenuPages from './pages/MenuPages.jsx';

const App = () => {

  return (
    <Container>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path='/login'>
              <Login />
            </Route>
            <PrivateRoute exact path='/main'>
              <Main />
            </PrivateRoute>
            <PrivateRoute exact path='/main/:nav'>
              <MenuPages />
            </PrivateRoute>
            <Redirect from='/' to='/main' />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
};

export default App;
