import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { beforeEach, expect, test, vi } from "vitest";
import { theme } from "../../styles/theme";
import HomePage from "./HomePage";

const renderPage = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </ThemeProvider>,
  );

beforeEach(() => {
  vi.clearAllMocks();
});

test("deve renderizar página Home", () => {
  renderPage();
  expect(screen.getByText(/Hoje/i)).toBeInTheDocument();
});
