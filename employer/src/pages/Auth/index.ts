import { lazy } from "react";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));

export { Login, Register };
