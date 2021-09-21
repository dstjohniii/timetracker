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
} from "react-router-dom";
import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";

function formatTitle(title) {
  if (!title) return "Dashboard";
  return title.charAt(0).toUpperCase() + title.slice(1);
}

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default function App() {
  const match = useRouteMatch("/:route");
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
            <LinkRouter underline="hover" to="/">
              Dashboard
            </LinkRouter>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return last ? (
                <Typography color="text.primary" key={to}>
                  {formatTitle(value)}
                </Typography>
              ) : (
                <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                  {formatTitle(value)}
                </LinkRouter>
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
