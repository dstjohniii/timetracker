import { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@apollo/client";
import { CREATE_USER, GET_ALL_USERS } from "../../queries/users";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  name: yup
    .string("Enter your name")
    .max(25, "Your name is too long, sorry.")
    .required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

export default function CreateUser({ open, handleClose }) {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [GET_ALL_USERS],
  });

  const onSubmit = (values) => {
    const { name, email, password } = values;
    createUser({
      variables: {
        name,
        password,
        email,
      },
    });
    handleClose();
    formik.resetForm();
  };

  const formRef = useRef();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit,
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a User</DialogTitle>
      <DialogContent>
        <form ref={formRef} onSubmit={formik.handleSubmit}>
          <Stack>
            <StyledTextField
              autoFocus
              label="Name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <StyledTextField
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <StyledTextField
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <StyledTextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            formik.resetForm();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            formRef.current.dispatchEvent(
              new Event("submit", {
                bubbles: true,
              })
            );
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
