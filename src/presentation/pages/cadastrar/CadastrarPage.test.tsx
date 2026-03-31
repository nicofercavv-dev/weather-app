import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import CadastrarPage from "./CadastrarPage";

it("deve renderizar o título principal", () => {
  render(<CadastrarPage />);
  expect(screen.getByText(/Cadastro Meteorológico/i)).toBeInTheDocument();
});
