import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import Header from "./Header";
import { MemoryRouter } from "react-router";

it("deve renderizar o header", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
  expect(screen.getByText(/Listar/i)).toBeInTheDocument();
});
