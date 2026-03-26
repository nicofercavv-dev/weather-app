import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import Footer from "./Footer";

it("deve renderizar o título principal", () => {
  render(<Footer />);
  expect(screen.getByText(/make with love/i)).toBeInTheDocument();
  expect(screen.getAllByAltText(/Logo da DB/i)).toBeInTheDocument();
});
