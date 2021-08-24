import { useQuery, gql } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(
    gql`
      query {
        user(id: 1) {
          email
          name
        }
      }
    `
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  const { user } = data;

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography>{user.name}</Typography>
        <Typography>{user.email}</Typography>
      </Paper>
    </Container>
  );
}

export default App;
