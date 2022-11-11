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

const theme = createTheme();

export default function EditUser() {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('Default error message');
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [is_supervisor, setIsSupervisor] = React.useState(false);


  const handleSubmit = async (event) => {
  };
  /*
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
    
  }; */
  
  React.useEffect(() => {
    async function fetchData() {
        const resp = await fetch('http://localhost:8000/users/1');
        const result = await resp.json();
        setIsSupervisor(result.is_supervisor);
        setEmail(result.email);
        setFullname(result.full_name);
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
            Editar Usuário
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullname"
                  required
                  fullWidth
                  id="fullname"
                  label="Nome completo"
                  value={fullname}
                  onChange={e => setFullname(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Endereço de e-mail"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox checked={is_supervisor} onChange={e => setIsSupervisor(e.target.checked)} />} label="Supervisor" />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Editar
            </Button>
            
            <Grid container justifyContent="center">
                <Grid item>
                { showSuccess ? <Alert severity="success">Atualização realizada com sucesso!</Alert> : null }
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