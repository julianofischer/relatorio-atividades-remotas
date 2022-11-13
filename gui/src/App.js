import logo from "./logo.svg";
import "./App.css";
import SignUp from "./SignUp";
import ReportView from "./ReportView";
import ListUsers from "./ListUsers";
import EditUser from "./EditUser";
import MenuAppBar from "./MenuAppBar";
import SignIn from "./SignIn";
import { createTheme } from "@mui/material/styles";
import { green, teal } from "@mui/material/colors";
import { Typography } from "@mui/material";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
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

  return (
    <>
      <Router>
        <div className="App">
          <MenuAppBar theme={theme} />
        </div>

        <Switch>
          <Route path="/login">
            <SignIn theme={theme} />
          </Route>
          <Route path="/cadastro">
            <SignUp theme={theme} />
          </Route>
          <Route path="/relatorio">
            <ReportView theme={theme} />
          </Route>
        </Switch>
        <Copyright sx={{ mt: 5 }} />
      </Router>
    </>
  );
}

export default App;
