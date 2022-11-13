import * as React from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";

//date-related imports
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

//table-related imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tooltipClasses } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/julianofischer">
        @julianofischer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ReportView(props) {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(
    "Default error message"
  );
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [horaInicio, setHoraInicio] = React.useState(null);
  const [horaFim, setHoraFim] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [totalHoras, setTotalHoras] = React.useState("");
  const [refMonth, setRefMonth] = React.useState("");
  const [refYear, setRefYear] = React.useState("");

  const weekday = ["Domingo", "Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];

  function diff_minutes(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    const minutes =  Math.abs(Math.round(diff));
    return minutes;
  }

  function minutesToHours(minutes) {
    const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mins = String(minutes % 60).padStart(2, "0");
    return `${String(hours).padStart(2,'0')}:${mins}`;
  }

  React.useEffect(() => {
    const getReport = async () => {
      const resp = await fetch("http://localhost:8000/reports/1");
      const data = await resp.json();
      const dt = new Date(data.ref_month);
      const rMonth = dt.toLocaleString("default", { month: "long" });
      const rYear = dt.getFullYear();
      setRefYear(rYear);
      setRefMonth(rMonth);
    }
    getReport();

    const getRows = async () => {
      const resp = await fetch("http://localhost:8000/reports/1/items");
      const result = await resp.json();
      result.map((item) => {
          const hora_inicio = item.init_hour.split(":")[0];
          const min_inicio = item.init_hour.split(":")[1];
          const hora_fim = item.end_hour.split(":")[0];
          const min_fim = item.end_hour.split(":")[1];
          const dt1 = new Date(null, null, null, hora_inicio, min_inicio);
          const dt2 = new Date(null, null, null, hora_fim, min_fim);
          const minutes = diff_minutes(dt2, dt1);
          item.minutes = minutes;
          item.horas_trabalhadas = minutesToHours(minutes);
          item.weekday = weekday[new Date(item.date).getDay()];
      });
      
      const total_minutes = result.reduce((acc, item) => {
        return acc + item.minutes;
      }, 0);

      setRows(result);
      setTotalHoras(minutesToHours(total_minutes));
    };
    getRows();
  }, []);


  const addRow = async () => {
    const response = await fetch("http://localhost:8000/reports/1/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report_id: 1,
        date: selectedDate.toISOString(),
        init_hour: moment(horaInicio).format("HH:mm"),
        end_hour: moment(horaFim).format("HH:mm"),
      }),
    });

    if (response.status === 200) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }else{
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      console.log(response);
    }
    /* const newRow = {
      data: selectedDate,
      horaInicio: horaInicio,
      horaFim: horaFim,
    };*/
    //console.log(newRow);
    console.log(selectedDate.getDate());
    console.log(selectedDate.getMonth() + 1);
    console.log(selectedDate.getFullYear());
    console.log(selectedDate.toLocaleDateString()); //12/11/2022

    //setRows([...rows, newRow]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addRow();
    /*
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
    */
  };

  return (
    <ThemeProvider theme={props.theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AssessmentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Relatório de {refMonth} de {refYear}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={3}>
                  <DatePicker
                    label="Data"
                    value={selectedDate}
                    onChange={(newValue) => {
                      setSelectedDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TimePicker
                    ampm={false}
                    label="Início"
                    value={horaInicio}
                    onChange={(newValue) => {
                      setHoraInicio(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TimePicker
                    ampm={false}
                    label="Fim"
                    value={horaFim}
                    onChange={(newValue) => {
                      setHoraFim(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Adicionar
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                {showSuccess ? (
                  <Alert severity="success">
                    Cadastro realizado com sucesso!
                  </Alert>
                ) : null}
              </Grid>
              <Grid item>
                {showError ? (
                  <Alert severity="error">{errorMessage}</Alert>
                ) : null}
              </Grid>
            </Grid>
          </Box>
          <Box  maxWidth="md">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: '650' }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell align="center">Dia da Semana</TableCell>
                    <TableCell align="center">Início</TableCell>
                    <TableCell align="center">Fim</TableCell>
                    <TableCell align="center">Horas Trabalhadas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.date}
                      </TableCell>
                      <TableCell align="center">{row.weekday}</TableCell>
                      <TableCell align="center">{row.init_hour}</TableCell>
                      <TableCell align="center">{row.end_hour}</TableCell>
                      <TableCell align="center">{row.horas_trabalhadas}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" align="right" sx={{ mt: 2 }}>
              Total de horas trabalhadas: {totalHoras}
            </Typography>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
