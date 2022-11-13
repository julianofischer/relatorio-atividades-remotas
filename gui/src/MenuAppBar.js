import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Menu from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";
import { ThemeProvider } from "@emotion/react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";

export default function MenuAppBar(props) {
  return (
    <ThemeProvider theme={props.theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <RouterLink to="/">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <HomeIcon />
              </IconButton>
              </RouterLink>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Relatório de Atividades Remotas
              </Typography>

              <Link href="/login">
                <Button variant="contained">Login</Button>
              </Link>

            </Toolbar>
          </AppBar>
        </Router>
      </Box>
    </ThemeProvider>
  );
}
