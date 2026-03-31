import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import FormularioMeterologico from "./FormularioMeterologico";

it("deve renderizar o título principal", () => {
  render(
    <FormularioMeterologico
      onSubmit={() => null}
      errors={{}}
      register={() =>  null}
      control={{}}
      isSubmitting={false}
    />,
  );
  expect(screen.getByLabelText(/Cidade/i)).toBeInTheDocument();
});
