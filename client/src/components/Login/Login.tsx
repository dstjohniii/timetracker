import * as yup from "yup";

import TextField, { TextFieldProps } from "@mui/material/TextField";

import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { LOGIN } from "../../queries/login";
import { LoginFormValues } from "../../types/login";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  margin: theme.spacing(1, 0),
  maxWidth: 256,
}));

export default function Login() {
  const [login, { loading, error }] = useMutation(LOGIN);

  const history = useHistory();

  const onSubmit = async (values: LoginFormValues) => {
    const { email, password } = values;
    try {
      const response = await login({
        variables: {
          email,
          password,
        },
      });
      Cookies.set("auth", response.data.login, {
        sameSite: "strict",
        expires: 1,
      });
      history.push("/home"); // redirect home
    } catch (error) {
      console.error("Failed to login: ", error); // TODO handle this
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack
          spacing={0}
          sx={{
            alignItems: "center",
          }}
        >
          <StyledTextField
            id="login-email"
            label="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <StyledTextField
            id="login-password"
            label="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Paper>
  );
}
