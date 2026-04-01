import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { theme } from "./presentation/styles/theme";
import { ThemeProvider } from "styled-components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={false}
        theme="colored"
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
