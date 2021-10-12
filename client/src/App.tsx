import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Users from "./components/User/Users";
import {
  Switch,
  Route,
  Link as RouterLink,
  useRouteMatch,
  Redirect,
  useLocation,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";
import { Type } from "typescript";

function formatTitle(title: string) {
  if (!title) return "Dashboard";
  return title.charAt(0).toUpperCase() + title.slice(1);
}

// const LinkRouter = (props: Type) => <Link {...props} component={RouterLink} />;
const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, "to">>(
  (props, ref) => (
    <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
  )
);

interface MatchParams {
  route: string;
}

export default function App() {
  const match = useRouteMatch<MatchParams>();
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
            {formatTitle(match?.params?.route)}
          </Typography>
          <Breadcrumbs>
            <Link component={RouterLink} to="/">
              Dashboard
            </Link>
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
          <Route path="/">
            <Link component={RouterLink} to="/users">
              Users
            </Link>
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Paper>
    </Container>
  );
}
