import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/index.jsx';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import Typography from '@mui/material/Typography';

import { LOGIN_USER } from '../../mutation/mutation.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const [login, { data, loading }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const auth = useAuth();
  const inpRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ variables: { username, password } })
    } catch (e) {
      setError(e.message)
    }
  };


  useEffect(() => {
    if (data) {
      localStorage.setItem('userId', JSON.stringify(data.login));
      setUsername('');
      setPassword('');
      auth.logIn();
      const { from } = location.state || { from: { pathname: '/' } };
      navigate(from, { replace: true });

    }
  }, [data])

  useEffect(() => {
    if (inpRef.current) inpRef.current.focus();
  }, [inpRef]);

  const renderUnAuthenticated = () => {

    const paperStyle = { padding: 30, width: 280, margin: "20px auto" };
    const btnstyle = { margin: '10px 0' };
    const inputStyle = { margin: '10px 0' };

    return (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <AccountBoxOutlinedIcon fontSize="large"/>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            inputRef={inpRef}
            label='Username'
            fullWidth
            required
            style={inputStyle}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            required
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          {error && <Typography sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>}
          <Button
            type='submit'
            color='primary'
            variant='contained'
            style={btnstyle}
            fullWidth
            onClick={(e) => handleSubmit(e)}
          >
            Sign in
          </Button>
        </Paper>
      </Grid>
    );
  };

  const renderAuthenticated = () => (
    <Grid>
        <Paper elevation={10} style={{ padding: 30, width: 280, margin: "20px auto" }}>
          <Grid align='center'>
            <AccountBoxOutlinedIcon fontSize="large"/>
            <h2>You are already logged in!</h2>
          </Grid>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            fullWidth
            onClick={() => {
              const { from } = location.state || { from: { pathname: '/main' } };
              navigate(from, { replace: true });
            }}
          >
            Continue to dashboard
          </Button>
        </Paper>
      </Grid>
  );

  return auth.loggedIn ? renderAuthenticated() : renderUnAuthenticated();

};

export default Login;

