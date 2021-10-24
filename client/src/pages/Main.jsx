import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';


const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id, username, email, displayName
    }
  }
`;


const Main = () => {
  const { data } = useQuery(GET_USERS);
  const auth = useAuth();
  return (
    <div className="text-center">
      <Link to="/test">Test 1</Link>
      <Link to="/test2">Test 2</Link>
      <h1>This is main page</h1>
      {data && data.getUsers.map((user) => (
        <p key={user._id}>{user.displayName}</p>
      ))}
      <button type="button" onClick={() => auth.logOut()}>LogOut</button>
    </div>
  )
}

export default Main
