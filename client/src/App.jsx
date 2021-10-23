import React, { useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useQuery, useMutation, gql } from '@apollo/client';

// import { GET_USERS } from './query/user';
// import { LOGIN_USER } from './mutation/user';

const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id, username, email, displayName
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId, token
    }
  }
`;

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data } = useQuery(GET_USERS);
  const [login, { data: loginData, error, loading }] = useMutation(LOGIN_USER);

  if (loginData) {
    localStorage.setItem('userId', JSON.stringify(loginData.login))
  }
  // console.log(data)
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } }).then(() => {
      setUsername('');
      setPassword('');
    });
  };

  return (
    <Container>
      <Form className='form' onSubmit={(e) => handleSubmit(e)}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} type='text' placeholder='Enter email' onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
        </Row>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <Button variant='primary' type='button' onClick={() => console.log(data)}>
          show data
      </Button>
      <Button variant='primary' type='button' onClick={() => localStorage.removeItem('userId')}>
          logout
      </Button>
      {/* {data.map((user) => (
        <p key={user._id}>{user.username}</p>
      ))} */}
    </Container>
  );
};

export default App;
