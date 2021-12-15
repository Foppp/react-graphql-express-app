import React, { useState, useRef, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import useAuth from '../../hooks/index.jsx';

import './login.css';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

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
  const navigate = useNavigate();
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
      navigate(from, { replace: true });
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
      <Box sx={{ display: 'flex', mx: 'auto', mt: '150px', maxWidth: 200 }}>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            alignContent: 'center',
          }}
          noValidate
          autoComplete='off'
        >
          <div>
            <TextField
              label='Username'
              id='standard-size-normal'
              variant='standard'
            />
          </div>
          <div>
            <TextField
              label='Password'
              id='standard-size-normal'
              variant='standard'
            />
          </div>
          <div>
          <Button variant="outlined">Outlined</Button>

          </div>
        </Box>
      </Box>

      // <div className='content'>
      //   <div className='welcome'>Welcome!</div>
      //   <div className='subtitle'>For using our service you need to login.</div>
      //   <form onSubmit={(e) => handleSubmit(e)}>
      //     <div className='input-fields'>
      //       <input
      //         ref={inputRef}
      //         type='text'
      //         placeholder='Username'
      //         className={classFeed}
      //         value={username}
      //         onChange={(e) => setUsername(e.target.value)}
      //         disabled={loading}
      //       />
      //       <input
      //         type='password'
      //         placeholder='Password'
      //         className={classFeed}
      //         value={password}
      //         onChange={(e) => setPassword(e.target.value)}
      //         disabled={loading}
      //       />
      //     </div>
      //     {error && <div className="invalid-feed">{error.message}</div>}
      //     <div>
      //       <button className='ghost-round full-width mt-5' disabled={loading}>LOGIN</button>
      //     </div>
      //   </form>
      // </div>
    );
  };

  const renderAuthenticated = () => (
    <div className='content'>
      <div className='welcome'>You are already logged in!</div>
      <div>
        <button className='ghost-round full-width mt-3' onClick={() => {
          const { from } = location.state || { from: { pathname: '/main' } };
          navigate(from, { replace: true });
        }}>
          Continue to dashboard
        </button>
      </div>
    </div>
  );

  return auth.loggedIn ? renderAuthenticated() : renderUnAuthenticated();

  


};

export default Login;

