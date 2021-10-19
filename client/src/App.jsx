import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS } from './query/user';
import { ADD_USER } from './mutation/user';

const App = () => {

  const [users, setUsers] = useState([]);
  // const [user, setUser] = useState(null);
  // const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('');
  const [userlastname, setUserlastname] = useState('');
  const [age, setAge] = useState(0);

  const { data, loading, refetch } = useQuery(GET_USERS);
  // const { data: oneUser } = useQuery(GET_USER, {
  //   variables: {
  //     id: userId
  //   }
  // });
  const [newUser] = useMutation(ADD_USER);
  const addUser = (e) => {
    e.preventDefault();
    // setUser(oneUser.getUser)
    newUser({
      variables: {
        input: {
          username, userlastname, age
        }
      }
    }).then(() => {
      setUsername('');
      setUserlastname('');
      // setUserId('');
      setAge(0);
      refetch();
    })
  };

  useEffect(() => {
    if (!loading) {
      setUsers(data.getUsers)
    }
  }, [data]);

  return (
    <Container>
      <Form className="form" onSubmit={(e) => addUser(e)}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridName'>
            <Form.Label>Name</Form.Label>
            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} controlId='formGridLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control value={userlastname} onChange={(e) => setUserlastname(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} controlId='formGridAge'>
            <Form.Label>Age</Form.Label>
            <Form.Control value={age} onChange={(e) => setAge(Number(e.target.value))}/>
          </Form.Group>
        </Row>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <Col className='data text-center'>
        <h1>Data:</h1>
        {users.map((user) => (
          <p key={user.id}>{user.id}: {user.username} {user.userlastname} - {user.age} y/o</p>
        ))}
      </Col>
    </Container>
  );
};

export default App;
