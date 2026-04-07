import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { useForm } from "react-hook-form";
import FormularioMeteorologico from "./FormularioMeteorologico";
import { theme } from "../../styles/theme";
import { ThemeProvider } from "styled-components";
import type { DadosMeteorologicosForm } from "../../pages/cadastrar/CadastrarPage";
import { MemoryRouter } from "react-router";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

test("deve renderizar todos os campos do formulário meteorológico", () => {
  const { result } = renderHook(() => useForm<DadosMeteorologicosForm>());
  const { register, control } = result.current;

  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <FormularioMeteorologico
          onSubmit={vi.fn((e) => e.preventDefault())}
          errors={{}}
          register={register}
          control={control}
          isSubmitting={false}
        />
      </MemoryRouter>
    </ThemeProvider>,
  );

  expect(screen.getByLabelText(/Cidade/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Data/)).toBeInTheDocument();

  expect(screen.getByLabelText(/Temperatura Máxima/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Precipitação/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Velocidade do Vento/)).toBeInTheDocument();
});

test("deve disparar o seletor de data ao clicar no campo de data", () => {
  const { result } = renderHook(() => useForm<DadosMeteorologicosForm>());

  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <FormularioMeteorologico
          onSubmit={vi.fn()}
          errors={{}}
          register={result.current.register}
          control={result.current.control}
          isSubmitting={false}
        />
      </MemoryRouter>
    </ThemeProvider>,
  );

  const inputData = screen.getByLabelText(/Data/) as HTMLInputElement;

  inputData.showPicker = vi.fn();

  fireEvent.click(inputData);

  expect(inputData.showPicker).toHaveBeenCalledTimes(1);
});

test("deve navegar para página inicial ao clicar em cancelar", () => {
  const { result } = renderHook(() => useForm<DadosMeteorologicosForm>());

  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <FormularioMeteorologico
          onSubmit={vi.fn()}
          errors={{}}
          register={result.current.register}
          control={result.current.control}
          isSubmitting={false}
        />
      </MemoryRouter>
    </ThemeProvider>,
  );

  const cancelButton = screen.getByText(/Cancelar/) as HTMLButtonElement;

  fireEvent.click(cancelButton);

  expect(mockNavigate).toHaveBeenCalledWith("/");
});
