import { useRef } from "react";
import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@apollo/client";
import { GET_ALL_USERS, UPDATE_USER } from "../../queries/users";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import * as yup from "yup";
import { useFormik } from "formik";
import { User, UserFormValues } from "../../types/users";

const validationSchema = yup.object({
  name: yup.string().max(25, "Your name is too long, sorry."),
  email: yup.string().email("Enter a valid email"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length"),
  confirmPassword: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

interface UpdateUserProps {
  open: boolean;
  handleClose: () => void;
  data: undefined | User;
}

export default function UpdateUser({
  open,
  handleClose,
  data,
}: UpdateUserProps) {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_ALL_USERS],
  });

  const onSubmit = (values: UserFormValues) => {
    const { name, email, password } = values;
    updateUser({
      variables: {
        id: data?.id,
        name,
        password,
        email,
      },
    });
    handleClose();
    formik.resetForm();
  };

  const formRef = useRef<HTMLFormElement>(null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name ?? "",
      email: data?.email ?? "",
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
      <DialogTitle>Update {data?.name ?? "User"}</DialogTitle>
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
            formRef?.current?.dispatchEvent(
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
