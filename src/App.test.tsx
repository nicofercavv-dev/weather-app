import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { theme } from "./presentation/styles/theme";

test("deve renderizar app", () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>,
  );
  expect(screen.getByTestId("page-content-container")).toBeInTheDocument();
});
