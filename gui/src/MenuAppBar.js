import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/icons-material/Menu";
import MenuItem from "@mui/icons-material/Menu";
import { Fade } from "@mui/material";
import SignUp from "./SignUp";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function MenuAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Relatório de Atividades Remotas
          </Typography>
          <Link to="/login"><Button color="inherit">Login</Button></Link>
        </Toolbar>
      </AppBar>
        
        <Switch>
          <Route path="/login">
            <SignUp />
          </Route>
        </Switch>

      </Router>
    </Box>
  );
}
