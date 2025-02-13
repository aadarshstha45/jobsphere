import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  name: yup.string().required("Name cannot be empty."),

  email: yup
    .string()
    .email("Invalid email.")
    .required("Email cannot be empty."),
  password: yup.string().required("Password cannot be empty."),
  confirmPassword: yup
    .string()
    .required("Confirm password cannot be empty.")
    .oneOf([yup.ref("password")], "Passwords didnot match."),
  userType: yup.string().default("jobseeker"),
});

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email.")
    .required("Email cannot be empty."),
  password: yup.string().required("Password cannot be empty."),
});

export const PasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old Password cannot be empty."),
  newPassword: yup.string().required("New Password cannot be empty."),
  confirmPassword: yup
    .string()
    .required("Confirm Password cannot be empty.")
    .oneOf([yup.ref("newPassword")], "Passwords did not match."),
});

export type RegisterFormValues = yup.InferType<typeof RegisterSchema>;
export type LoginFormValues = yup.InferType<typeof LoginSchema>;
export type PasswordFormValues = yup.InferType<typeof PasswordSchema>;
