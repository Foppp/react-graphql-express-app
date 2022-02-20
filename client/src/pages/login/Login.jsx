import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import Typography from '@mui/material/Typography';

import useAuth from '../../hooks/index.jsx';
import useStyles from '../../assets/styles/login/loginStyles';
import { LOGIN_USER } from '../../mutation/mutation.js';

const Copyright = (props) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '} Entertainment Dash {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
      <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Username'
            name='email'
            autoComplete='email'
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
disabled={loading}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
disabled={loading}
              
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          </Box>
          {error && <Typography color='error'>{error}</Typography>}
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
      // <Box>
      //   <Paper elevation={10} className={classes.root}>
      //     <Box>
      //       <AccountBoxOutlinedIcon fontSize='large' />
      //       <Typography variant='h6'>Sign In</Typography>
      //     </Box>
      //     <Box component='form' className={classes.form} spacing={3}>
      //       <TextField
      //         inputRef={inpRef}
      //         label='Username'
      //         fullWidth
      //         margin='normal'
      //         variant='standard'
      //         required
      //         onChange={(e) => setUsername(e.target.value)}
      //         disabled={loading}
      //       />
      //       <TextField
      //         label='Password'
      //         type='password'
      //         fullWidth
      //         margin='normal'
      //         variant='standard'
      //         required
      //         onChange={(e) => setPassword(e.target.value)}
      //         disabled={loading}
      //       />
      //       <Button
      //         sx={{ mt: 3, mb: 1 }}
      //         type='submit'
      //         color='primary'
      //         variant='contained'
      //         fullWidth
      //         onClick={(e) => handleSubmit(e)}
      //       >
      //         Sign in
      //       </Button>
      //       {error && <Typography color='error'>{error}</Typography>}
      //     </Box>
      //   </Paper>
      // </Box>
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
