import * as React from "react";

import {
  Redirect,
  Route,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

import { Breadcrumbs } from "@mui/material";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Login } from "./components/Login";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Users } from "./components/User";

function formatTitle(title: string) {
  return title.charAt(0).toUpperCase() + title.slice(1);
}

interface MatchParams {
  route: string;
}

export default function App() {
  const match = useRouteMatch<MatchParams>("/:route");
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Container>
      <Paper
        sx={{
          marginTop: (theme) => theme.spacing(1),
          padding: (theme) => theme.spacing(1),
          backgroundColor: (theme) => theme.palette.background.grey,
        }}
      >
        <Paper
          sx={{
            marginTop: (theme) => theme.spacing(1),
            padding: (theme) => theme.spacing(1),
            marginBottom: (theme) => theme.spacing(1),
          }}
        >
          <Typography variant="h1">
            {formatTitle(match?.params?.route ?? "Welcome")}
          </Typography>
          <Breadcrumbs>
            {match?.params?.route !== "home" && !!match?.params?.route ? (
              <Link component={RouterLink} to="/home">
                Home
              </Link>
            ) : null}
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return last ? (
                <Typography color="text.primary" key={to}>
                  {formatTitle(value)}
                </Typography>
              ) : (
                <Link component={RouterLink} color="inherit" to={to} key={to}>
                  {formatTitle(value)}
                </Link>
              );
            })}
          </Breadcrumbs>
        </Paper>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/home">
            <Link component={RouterLink} to="/users">
              Users
            </Link>
          </Route>
          <Route path="/">
            <Login />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Paper>
    </Container>
  );
}
