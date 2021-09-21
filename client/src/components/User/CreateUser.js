import { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@apollo/client";
import { CREATE_USER, GET_ALL_USERS } from "../../queries/users";

export default function CreateUser({ open, handleClose }) {
  const formRef = useRef();

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [GET_ALL_USERS],
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(`data`, data);

  const handleSubmit = (event) => {
    const { name, email, password, confirmPassword } = event.target;
    createUser({
      variables: {
        name: name.value,
        password: password.value,
        email: email.value,
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>Create a User</DialogContentText>
        <form ref={formRef} onSubmit={handleSubmit}>
          <TextField autoFocus label="Name" type="text" name="name" />
          <TextField label="Email" type="email" name="email" />
          <TextField label="Password" type="password" name="password" />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            formRef.current.dispatchEvent(
              new Event("submit", {
                bubbles: true,
              })
            );
            handleClose();
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
