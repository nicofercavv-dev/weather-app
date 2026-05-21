import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, beforeEach, vi, test } from "vitest";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";
import EditarPage from "./EditarPage";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
    useNavigate: () => vi.fn(),
  };
});

const mockExecute = vi.fn();
const mockBuscarPorIdExecute = vi.fn();

vi.mock("../../../data/usecase/editar-dado-meteorologico.usecase", () => {
  return {
    EditarDadoMeteorologico: class {
      execute = mockExecute;
    },
  };
});

vi.mock(
  "../../../data/usecase/buscar-dado-meteorologico-por-id.usecase",
  () => ({
    BuscarDadoMeteorologicoPorId: class {
      execute = mockBuscarPorIdExecute;
    },
  }),
);

const renderPage = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <EditarPage />
      </MemoryRouter>
    </ThemeProvider>,
  );

beforeEach(() => {
  vi.clearAllMocks();
});

test("deve renderizar página de edição", () => {
  renderPage();
  expect(screen.getByText(/Editar Dado Meteorológico/i)).toBeInTheDocument();
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
  mockExecute.mockResolvedValueOnce({} as any);

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
      "Informações salvas com sucesso",
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

test("deve buscar os dados do registro ao carregar a página e preencher o formulário", async () => {
  mockBuscarPorIdExecute.mockResolvedValueOnce({
    id: 1,
    cidade: "Fortaleza",
    dataRegistro: "2026-05-21",
    tempoDia: "LIMPO",
    tempoNoite: "NUBLADO",
    temperaturaMaxima: 32,
    temperaturaMinima: 23,
    precipitacao: 5,
    umidade: 70,
    velocidadeVento: 18,
  });

  renderPage();

  expect(mockBuscarPorIdExecute).toHaveBeenCalledWith(1);

  await waitFor(() => {
    expect(screen.getByLabelText(/Cidade/)).toHaveValue("Fortaleza");
    expect(screen.getByLabelText(/data/i)).toHaveValue("2026-05-21");
    expect(screen.getByLabelText(/tempo dia/i)).toHaveValue("LIMPO");
    expect(screen.getByLabelText(/tempo noite/i)).toHaveValue("NUBLADO");

    expect(screen.getByLabelText(/temperatura máxima/i)).toHaveValue("32°");
    expect(screen.getByLabelText(/temperatura mínima/i)).toHaveValue("23°");
    expect(screen.getByLabelText(/precipitação/i)).toHaveValue("5%");
    expect(screen.getByLabelText(/umidade/i)).toHaveValue("70%");
    expect(screen.getByLabelText(/velocidade do vento/i)).toHaveValue("18km/h");
  });
});

test("deve capturar erro no console se a busca inicial falhar", async () => {
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  mockBuscarPorIdExecute.mockRejectedValueOnce(new Error("Erro de conexão"));

  renderPage();

  await waitFor(() => {
    expect(mockBuscarPorIdExecute).toHaveBeenCalledWith(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Erro ao buscar dado meteorológico:",
      expect.any(Error),
    );
  });

  consoleSpy.mockRestore();
});
