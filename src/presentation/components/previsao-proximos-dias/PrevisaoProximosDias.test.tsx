import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { PrevisaoProximosDias } from "./PrevisaoProximosDias";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router";
import { theme } from "../../styles/theme";
import type { DadosMeteorologicos } from "../../../domain/models/dados-meteorologicos";
import { TempoValues } from "../../../types/tempo-enum";

const mockDados: DadosMeteorologicos[] = [
  {
    id: 1,
    cidade: "Açailândia",
    data: "2026-05-12",
    tempoDia: TempoValues.LIMPO,
    tempoNoite: TempoValues.CHUVA,
    temperaturaMinima: 22,
    temperaturaMaxima: 30,
    precipitacao: 50,
    umidade: 78,
    velocidadeDoVento: 9,
  },
  {
    id: 2,
    cidade: "Açailândia",
    data: "2026-05-13",
    tempoDia: TempoValues.SOL_COM_NUVENS,
    tempoNoite: TempoValues.NUBLADO,
    temperaturaMinima: 21,
    temperaturaMaxima: 34,
    precipitacao: 60,
    umidade: 65,
    velocidadeDoVento: 10,
  },
];

const renderPage = (mockDados: DadosMeteorologicos[]) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <PrevisaoProximosDias dadosMeteorologicos={mockDados} />
      </MemoryRouter>
    </ThemeProvider>,
  );

beforeEach(() => {
  vi.clearAllMocks();
});

describe("PrevisaoProximosDias", () => {
  it("deve renderizar a lista de previsão corretamente quando houver dados", () => {
    renderPage(mockDados);

    expect(screen.getByText("12/05/2026")).toBeInTheDocument();

    expect(screen.getByText(/22°/i)).toBeInTheDocument();
    expect(screen.getByText(/34°/i)).toBeInTheDocument();
  });

  it('deve exibir a mensagem "Sem Dados" quando a lista estiver vazia', () => {
    renderPage([]);

    expect(screen.getByText("Sem Dados")).toBeInTheDocument();
  });
});
