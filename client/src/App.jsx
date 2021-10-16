import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const App = () => {
  return (
    <Container >
      <Form>
        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Enter your name' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicLastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text' placeholder='Last Name' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add User
        </Button>
      </Form>
    </Container>
  );
};

export default App;
