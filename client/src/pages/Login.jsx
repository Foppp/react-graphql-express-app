import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId
      token
    }
  }
`;

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error, loading }] = useMutation(LOGIN_USER);
  const history = useHistory();
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } }).then(({ data }) => {
      localStorage.setItem('userId', JSON.stringify(data.login));
      auth.logIn();
      setUsername('');
      setPassword('');
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    }).catch((e) => console.log('login error', e));
  };

  return auth.loggedIn
    ? (<h1>You already logged in</h1>)
    : (
      <Card>
      <Card.Body>
        <Form className='form p-5' onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId='formGridEmail'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              type='text'
              placeholder='Enter email'
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              isInvalid={!!error}
            />
          </Form.Group>
          <Form.Group controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              isInvalid={!!error}
            />
              <Form.Control.Feedback type="invalid">
                {error && error.message}
              </Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary mt-3' type='submit' disabled={loading}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
    );
};

export default Login;
