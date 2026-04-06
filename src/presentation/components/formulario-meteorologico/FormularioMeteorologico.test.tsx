import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { useForm } from "react-hook-form";
import FormularioMeterologico from "./FormularioMeterologico";
import { theme } from "../../styles/theme";
import { ThemeProvider } from "styled-components";

test("deve renderizar todos os campos do formulário meteorológico", () => {
  const { result } = renderHook(() => useForm());
  const { register, control } = result.current;

  render(
    <ThemeProvider theme={theme}>
      <FormularioMeterologico
        onSubmit={vi.fn((e) => e.preventDefault())}
        errors={{}}
        register={register}
        control={control}
        isSubmitting={false}
      />
    </ThemeProvider>,
  );

  expect(screen.getByLabelText(/Cidade/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Data/)).toBeInTheDocument();

  expect(screen.getByLabelText(/Temperatura Máxima/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Precipitação/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Velocidade do Vento/)).toBeInTheDocument();
});

test("deve disparar o seletor de data ao clicar no campo de data", () => {
  const { result } = renderHook(() => useForm());

  render(
    <ThemeProvider theme={theme}>
      <FormularioMeterologico
        onSubmit={vi.fn()}
        errors={{}}
        register={result.current.register}
        control={result.current.control}
        isSubmitting={false}
      />
    </ThemeProvider>,
  );

  const inputData = screen.getByLabelText(/Data/) as HTMLInputElement;

  inputData.showPicker = vi.fn();

  fireEvent.click(inputData);

  expect(inputData.showPicker).toHaveBeenCalledTimes(1);
});
