import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Footer from "./Footer";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

test("deve renderizar o título principal", () => {
  render(
    <ThemeProvider theme={theme}>
      <Footer />
    </ThemeProvider>,
  );
  expect(screen.getByText(/make with love/i)).toBeInTheDocument();
  expect(screen.getByAltText(/Logo da DB/i)).toBeInTheDocument();
});
