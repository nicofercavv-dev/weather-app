import { render, screen } from "@testing-library/react";
import { it, expect, beforeEach, vi, test } from "vitest";
import CadastrarPage from "./CadastrarPage";
import { MemoryRouter } from "react-router";
import { describe } from "zod/v4/core";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const renderPage = () =>
  render(
    <MemoryRouter>
      <CadastrarPage />
    </MemoryRouter>,
  );

beforeEach(() => {
  vi.clearAllMocks();
});

test("CadastrarPage", () => {
  it("deve renderizar página de cadastro", () => {
    render(<CadastrarPage />);
    expect(screen.getByText(/Cadastro Meteorológico/i)).toBeInTheDocument();
  });

  it("deve disparar toast de erro quando a validação falhar", async () => {
    renderPage();

    const botaoSalvar = screen.getByRole("button", { name: /salvar/i });
    fireEvent.click(botaoSalvar);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Existem campos inválidos no formulário",
        expect.any(Object),
      );
    });
  });

  it("deve disparar toast de sucesso quando o formulário for válido", async () => {
    const user = userEvent.setup();
    renderPage();

    // Preenchendo campos simples
    await user.type(screen.getByLabelText(/cidade/i), "São Paulo");

    // Data (input type date)
    fireEvent.change(screen.getByLabelText(/data/i), {
      target: { value: "2024-05-20" },
    });

    // Selects (usando os valores do seu enum)
    await user.selectOptions(screen.getByLabelText(/tempo dia/i), "SOL");
    await user.selectOptions(screen.getByLabelText(/tempo noite/i), "NUBLADO");

    // Inputs numéricos (react-number-format)
    await user.type(screen.getByLabelText(/temperatura máxima/i), "30");
    await user.type(screen.getByLabelText(/temperatura mínima/i), "15");
    await user.type(screen.getByLabelText(/precipitação/i), "10");
    await user.type(screen.getByLabelText(/umidade/i), "60");
    await user.type(screen.getByLabelText(/velocidade do vento/i), "12");

    const botaoSalvar = screen.getByRole("button", { name: /salvar/i });
    await user.click(botaoSalvar);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Informações enviadas com sucesso",
        expect.any(Object),
      );
    });
  });
});
