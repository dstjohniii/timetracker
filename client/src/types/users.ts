export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
