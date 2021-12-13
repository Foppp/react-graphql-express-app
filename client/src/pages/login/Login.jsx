import React, { useState, useRef, useEffect } from 'react';
// import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import useAuth from '../../hooks/index.jsx';

import './login.css';

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
  const [error, setError] = useState(null)
  const [login, { data, loading }] = useMutation(LOGIN_USER);
  const history = useHistory();
  const auth = useAuth();
  const inputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ variables: { username, password } })
    } catch (e) {
      setError(e)
    }
  };


  useEffect(() => {
    if (data) {
      localStorage.setItem('userId', JSON.stringify(data.login));
      setUsername('');
      setPassword('');
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
      auth.logIn();
    }
  }, [data])

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, [inputRef]);

  const renderUnAuthenticated = () => {
    const classFeed = cn('input-line full-width', {
      invalid: error,
    });

    return (
      <div className='content'>
        <div className='welcome'>Welcome!</div>
        <div className='subtitle'>For using our service you need to login.</div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='input-fields'>
            <input
              ref={inputRef}
              type='text'
              placeholder='Username'
              className={classFeed}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <input
              type='password'
              placeholder='Password'
              className={classFeed}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          {error && <div className="invalid-feed">{error.message}</div>}
          <div>
            <button className='ghost-round full-width mt-5' disabled={loading}>LOGIN</button>
          </div>
        </form>
      </div>
    )
  };

  const renderAuthenticated = () => (
    <div className='content'>
      <div className='welcome'>You are already logged in!</div>
      <div>
        <button className='ghost-round full-width mt-3' onClick={() => {
          const { from } = location.state || { from: { pathname: '/main' } };
          history.replace(from);
        }}>
          Continue to dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className='container login-container d-flex justify-content-center'>
      {auth.loggedIn ? renderAuthenticated() : renderUnAuthenticated()}
    </div>
  );

  //   <Card className='mx-5 shadow-sm'>
  //   <Card.Body className='p-2'>
  //       <Col md className='my-auto'>
  //         <Form
  //           className='login p-2'
  //           onSubmit={(e) => handleSubmit(e)}
  //         >
  //           <Form.Group controlId='formGridEmail'>
  //             <Form.Label>Username</Form.Label>
  //             <Form.Control
  //               value={username}
  //               type='text'
  //               placeholder='Enter email'
  // onChange={(e) => setUsername(e.target.value)}
  // disabled={loading}
  // isInvalid={!!error}
  //             />
  //           </Form.Group>
  //           <Form.Group controlId='formGridPassword'>
  //             <Form.Label>Password</Form.Label>
  //             <Form.Control
  //               value={password}
  //               type='password'
  //               placeholder='Password'
  //               onChange={(e) => setPassword(e.target.value)}
  //               disabled={loading}
  //               isInvalid={!!error}
  //             />
  //             <Form.Control.Feedback type='invalid'>
  //               {error && error.message}
  //             </Form.Control.Feedback>
  //           </Form.Group>
  //           <Button variant='primary mt-3' type='submit' disabled={loading}>
  //             Submit
  //           </Button>
  //         </Form>
  //       </Col>
  //     </Row>
  //   </Card.Body>
  // </Card>
};

export default Login;

