import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";

import { Slide, ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./index.css";
import { theme } from "./theme";
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider store={store}>
          <ToastContainer
            position="bottom-right"
            newestOnTop
            autoClose={3000}
            pauseOnFocusLoss={false}
            transition={Slide}
          />
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
