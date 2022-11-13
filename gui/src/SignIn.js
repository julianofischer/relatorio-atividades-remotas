import * as React from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUp from './SignUp';
import {Link as RouterLink} from 'react-router-dom';
import { green, teal} from '@mui/material/colors';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/julianofischer">
        @julianofischer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn(props) {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('Default error message');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = { email: data.get('email'),
                  password: data.get('password'),
                  password2: data.get('password2'),
                  full_name: data.get('fullname') 
                };
    console.log(obj);
    const body = JSON.stringify(obj)
    console.log(body);
    const resp = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
    console.log('resp');
    const result = await resp.json();

    if (!resp.ok) {
        const errors = result.detail.map(x => x.msg);
        const error = errors.join('; ');
        setErrorMessage(error);
        setShowError(true);
        setTimeout(() => setShowError(false), 6000);
    }else{
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    }
    
  };    

  return (
    <ThemeProvider theme={props.theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Endereço de e-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                  <RouterLink to="/cadastro" variant="body2">
                    Não tem uma conta? Cadastre-se
                  </RouterLink>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                { showSuccess ? <Alert severity="success">Cadastro realizado com sucesso!</Alert> : null }
                </Grid>
                <Grid item>
                { showError ? <Alert severity="error">{errorMessage}</Alert> : null }
                </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}