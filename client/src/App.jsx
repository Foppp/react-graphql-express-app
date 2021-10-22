import React, { useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
// import { GET_USERS } from './query/user';
// import { LOGIN_USER } from './mutation/user';

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id, username, email, token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput) {
    login(input: $input) {
      user { id, username }, token
    }
  }
`;

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data } = useQuery(GET_USERS);

  // const [login] = useMutation(LOGIN_USER);
  
  // console.log(data)
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   login({ variables: { input: { username, password } } }, {
  //     update(_, result) {
  //       console.log(result)
  //     }
  //   });
  // };

  return (
    <Container>
      <Form className='form'>
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
          Submit
        </Button>
    </Container>
  );
};

export default App;
