import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { theme } from "../../styles/theme";
import ListarPage from "./ListarPage";
import { toast } from "react-toastify";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const mockNavigate = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockExecute = vi.fn();
const mockExecuteDelete = vi.fn();

vi.mock("../../../data/usecase/listar-dados-meteorologicos.usecase", () => {
  return {
    ListarDadosMeteorologicos: class {
      execute = mockExecute;
    },
  };
});

vi.mock("../../../data/usecase/deletar-dado-meteorologico.usecase", () => {
  return {
    DeletarDadoMeteorologico: class {
      execute = mockExecuteDelete;
    },
  };
});

const renderPage = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <ListarPage />
      </MemoryRouter>
    </ThemeProvider>,
  );

test("deve renderizar página de listagem", () => {
  renderPage();
  expect(screen.getByText(/Lista de Cidades/i)).toBeInTheDocument();
});

describe("ListarPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockExecute.mockReset();
  });

  test("deve renderizar página de listagem", () => {
    mockExecute.mockResolvedValue({ content: [], totalPages: 1 });
    renderPage();
    expect(screen.getByText(/Lista de Cidades/i)).toBeInTheDocument();
  });

  it("deve carregar os dados iniciais ao montar a página", async () => {
    mockExecute.mockResolvedValue({
      content: [{ id: 1, cidade: "São Paulo", data: "2026-05-12" }],
      totalPages: 5,
    });

    renderPage();

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalledWith("", 0);
      expect(screen.getByText("São Paulo")).toBeInTheDocument();
    });
  });

  it("deve atualizar a lista quando uma busca é realizada", async () => {
    mockExecute.mockResolvedValueOnce({ content: [], totalPages: 1 });
    mockExecute.mockResolvedValueOnce({
      content: [{ id: 2, cidade: "Rio", data: "2026-05-12" }],
      totalPages: 1,
    });

    renderPage();

    const input = screen.getByPlaceholderText(/Pesquisar/i);
    fireEvent.change(input, { target: { value: "Rio" } });

    const btn = screen.getByRole("button", { name: "Pesquisar" });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalledWith("Rio", 0);
    });
  });

  it("deve passar de página corretamente", async () => {
    mockExecute.mockResolvedValueOnce({
      content: [{ id: 1, cidade: "Cidade Antiga", data: "2026-05-12" }],
      totalPages: 3,
    });

    renderPage();

    await screen.findByText("Cidade Antiga");

    mockExecute.mockResolvedValueOnce({
      content: [{ id: 2, cidade: "Cidade Nova", data: "2026-05-13" }],
      totalPages: 3,
    });

    const nextBtn = screen.getByRole("button", { name: ">" });

    expect(nextBtn).not.toBeDisabled();

    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalledWith("", 1);
      expect(screen.getByText("Cidade Nova")).toBeInTheDocument();
    });
  });

  it("deve voltar para a página anterior corretamente ao clicar no botão de voltar", async () => {
    mockExecute.mockResolvedValueOnce({
      content: [{ id: 1, cidade: "São Paulo", data: "2026-05-12" }],
      totalPages: 2,
    });

    renderPage();

    await screen.findByText("São Paulo");

    mockExecute.mockResolvedValueOnce({
      content: [{ id: 2, cidade: "Rio de Janeiro", data: "2026-05-13" }],
      totalPages: 2,
    });

    const nextBtn = screen.getByRole("button", { name: ">" });
    fireEvent.click(nextBtn);

    await screen.findByText("Rio de Janeiro");

    mockExecute.mockResolvedValueOnce({
      content: [{ id: 1, cidade: "São Paulo", data: "2026-05-12" }],
      totalPages: 2,
    });

    const prevBtn = screen.getByRole("button", { name: "<" });

    expect(prevBtn).not.toBeDisabled();

    fireEvent.click(prevBtn);

    await waitFor(() => {
      expect(mockExecute).toHaveBeenLastCalledWith("", 0);
      expect(screen.getByText("São Paulo")).toBeInTheDocument();
    });
  });

  it("deve deletar dado ao clicar no botão de deletar", async () => {
    mockExecute.mockResolvedValueOnce({
      content: [{ id: 1, cidade: "São Paulo", data: "2026-05-12" }],
      totalPages: 2,
    });

    mockExecuteDelete.mockResolvedValueOnce(void 0);

    mockExecute.mockResolvedValueOnce({
      content: [],
      totalPages: 1,
    });

    renderPage();

    const botaoExcluir = await screen.findByRole("button", {
      name: /Excluir São Paulo/,
    });
    fireEvent.click(botaoExcluir);

    await waitFor(() => {
      expect(mockExecuteDelete).toHaveBeenCalledWith(1);
      expect(toast.success).toHaveBeenCalledWith("Dado deletado com sucesso");
    });
  });

  it("deve mostrar toast de erro caso chamada de usecase de delete dê erro", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockExecute.mockResolvedValueOnce({
      content: [{ id: 1, cidade: "São Paulo", data: "2026-05-12" }],
      totalPages: 2,
    });

    mockExecuteDelete.mockRejectedValueOnce(
      new Error("Erro interno do servidor"),
    );

    renderPage();

    const botaoExcluir = await screen.findByRole("button", {
      name: /Excluir São Paulo/,
    });
    fireEvent.click(botaoExcluir);

    await waitFor(() => {
      expect(mockExecuteDelete).toHaveBeenCalledWith(1);
      expect(toast.error).toHaveBeenCalledWith("Erro ao deletar os dado");
    });
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("deve redirecionar para pagina de editar quando clicar no botão de editar", async () => {
    mockExecute.mockResolvedValueOnce({
      content: [{ id: 1, cidade: "São Paulo", data: "2026-05-12" }],
      totalPages: 2,
    });

    renderPage();

    const botaoEditar = await screen.findByRole("button", {
      name: /Editar São Paulo/,
    });
    fireEvent.click(botaoEditar);

    expect(mockNavigate).toHaveBeenCalledWith("/editar/1");
  });
});
