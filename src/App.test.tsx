import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import App from "./App";

it("deve renderizar o título principal", () => {
  render(<App />);
  expect(screen.getByTestId("page-content-container")).toBeInTheDocument();
});
