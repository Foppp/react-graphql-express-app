import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import useAuth from '../../hooks/index.jsx';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import Typography from '@mui/material/Typography';

import useStyles from '../../assets/styles/login/loginStyles';

import { LOGIN_USER } from '../../mutation/mutation.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [login, { data, loading }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const auth = useAuth();
  const inpRef = useRef(null);
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ variables: { username, password } });
    } catch (e) {
      setError(e.message);
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
  }, [data]);

  useEffect(() => {
    if (inpRef.current) inpRef.current.focus();
  }, [inpRef]);

  const renderUnAuthenticated = () => {
    return (
      <Box>
        <Paper elevation={10} className={classes.root}>
          <Box>
            <AccountBoxOutlinedIcon fontSize='large' />
            <Typography variant='h6'>Sign In</Typography>
          </Box>
          <Box component='form' className={classes.form} spacing={3}>
            <TextField
              inputRef={inpRef}
              label='Username'
              fullWidth
              margin='normal'
              variant='standard'
              required
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <TextField
              label='Password'
              type='password'
              fullWidth
              margin='normal'
              variant='standard'
              required
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              sx={{ mt: 3, mb: 1 }}
              type='submit'
              color='primary'
              variant='contained'
              fullWidth
              onClick={(e) => handleSubmit(e)}
            >
              Sign in
            </Button>
            {error && <Typography color='error'>{error}</Typography>}
          </Box>
        </Paper>
      </Box>
    );
  };

  const renderAuthenticated = () => (
    <Grid>
      <Paper elevation={10} className={classes.root}>
        <Grid align='center'>
          <AccountBoxOutlinedIcon fontSize='large' />
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
