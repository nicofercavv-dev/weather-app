import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, beforeEach, vi, test } from "vitest";
import CadastrarPage from "./CadastrarPage";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockExecute = vi.fn();

vi.mock("../../../data/usecase/registrar-dados-meteorologicos.usecase", () => {
  return {
    RegistrarDadosMeteorologicos: class {
      execute = mockExecute;
    },
  };
});

const renderPage = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <CadastrarPage />
      </MemoryRouter>
    </ThemeProvider>,
  );

beforeEach(() => {
  vi.clearAllMocks();
});

test("deve renderizar página de cadastro", () => {
  renderPage();
  expect(screen.getByText(/Cadastro Meteorológico/i)).toBeInTheDocument();
});

test("deve disparar toast de erro quando a validação falhar", async () => {
  renderPage();

  const botaoSalvar = screen.getByRole("button", { name: /salvar/i });
  fireEvent.click(botaoSalvar);

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith(
      "Existem campos inválidos no formulário",
    );
  });
});

test("deve disparar toast de sucesso quando o formulário for válido", async () => {
  mockExecute.mockResolvedValueOnce(void 0);

  const user = userEvent.setup();
  renderPage();

  await user.type(screen.getByLabelText(/Cidade/), "São Paulo");

  fireEvent.change(screen.getByLabelText(/data/i), {
    target: { value: "2026-04-08" },
  });

  await user.selectOptions(screen.getByLabelText(/tempo dia/i), "LIMPO");
  await user.selectOptions(screen.getByLabelText(/tempo noite/i), "NUBLADO");

  const inputMax = screen.getByLabelText(/temperatura máxima/i);
  await user.clear(inputMax);
  await user.type(inputMax, "30");

  const inputMin = screen.getByLabelText(/temperatura mínima/i);
  await user.clear(inputMin);
  await user.type(inputMin, "15");

  await user.type(screen.getByLabelText(/precipitação/i), "10");
  await user.type(screen.getByLabelText(/umidade/i), "60");
  await user.type(screen.getByLabelText(/velocidade do vento/i), "12");

  const botaoSalvar = screen.getByRole("button", { name: /salvar/i });
  await user.click(botaoSalvar);

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith(
      "Informações enviadas com sucesso",
    );
  });
});

test("deve disparar toast de erro quando a chamada ao usecase falhar", async () => {
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  mockExecute.mockRejectedValueOnce(new Error("Erro interno do servidor"));

  const user = userEvent.setup();
  renderPage();

  await user.type(screen.getByLabelText(/Cidade/), "São Paulo");

  fireEvent.change(screen.getByLabelText(/data/i), {
    target: { value: "2026-04-08" },
  });

  await user.selectOptions(screen.getByLabelText(/tempo dia/i), "LIMPO");
  await user.selectOptions(screen.getByLabelText(/tempo noite/i), "NUBLADO");

  const inputMax = screen.getByLabelText(/temperatura máxima/i);
  await user.clear(inputMax);
  await user.type(inputMax, "30");

  const inputMin = screen.getByLabelText(/temperatura mínima/i);
  await user.clear(inputMin);
  await user.type(inputMin, "15");

  await user.type(screen.getByLabelText(/precipitação/i), "10");
  await user.type(screen.getByLabelText(/umidade/i), "60");
  await user.type(screen.getByLabelText(/velocidade do vento/i), "12");

  const botaoSalvar = screen.getByRole("button", { name: /salvar/i });
  await user.click(botaoSalvar);

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith("Erro ao salvar os dados");
  });
  expect(consoleSpy).toHaveBeenCalled();
  consoleSpy.mockRestore();
});
