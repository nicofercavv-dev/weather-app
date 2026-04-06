import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Header from "./Header";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

test("deve renderizar o header", () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ThemeProvider>,
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
  expect(screen.getByText(/Listar/i)).toBeInTheDocument();
});
