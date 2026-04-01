import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import App from "./App";
import { MemoryRouter } from "react-router";

it("deve renderizar app", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByTestId("page-content-container")).toBeInTheDocument();
});
