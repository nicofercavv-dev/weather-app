import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { theme } from "../../styles/theme";
import ListarPage from "./ListarPage";

const mockExecute = vi.fn();

vi.mock("../../../data/usecase/listar-dados-meteorologicos", () => {
  return {
    ListarDadosMeteorologicos: vi.fn().mockImplementation(function () {
      return { execute: mockExecute };
    }),
  };
});

vi.mock(
  "../../../infra/repositories/dados-meteorologicos-repository-impl",
  () => ({
    DadosMeteorologicosRepositoryImpl: vi.fn(),
  }),
);

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
});
