import * as React from 'react';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const theme = createTheme();

function UsersTable(props){
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const resp = await fetch('http://localhost:8000/users');
            const result = await resp.json();
            setRows(result);
        }
        fetchData();
    }, []);

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">E-mail</TableCell>
                <TableCell align="right">Supervisor</TableCell>
                <TableCell align="right">is_supervisor</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.full_name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.supervisor}</TableCell>
                <TableCell align="right">
                    {row.is_supervisor ? <Checkbox checked disabled/> : <Checkbox disabled/>}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default function ListUsers() {
    return (
        <ThemeProvider theme={theme}>
        <Typography component="h1" variant="h3">
            Lista de usuários
        </Typography>
        <Container component="main" maxWidth="lg">
            <UsersTable />
        </Container>
        </ThemeProvider>
    )
}