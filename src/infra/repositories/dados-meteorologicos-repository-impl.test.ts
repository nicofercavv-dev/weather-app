import { describe, it, expect, vi, beforeEach } from "vitest";
import { DadosMeteorologicosRepositoryImpl } from "./dados-meteorologicos-repository-impl";
import httpClient from "../../core/http/http-client";
import { TempoValues } from "../../types/tempo-enum";

vi.mock("../../core/http/http-client", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("DadosMeteorologicosRepositoryImpl", () => {
  let repository: DadosMeteorologicosRepositoryImpl;

  beforeEach(() => {
    repository = new DadosMeteorologicosRepositoryImpl();
    vi.clearAllMocks();
  });

  it("deve chamar o endpoint de registro com os dados corretos", async () => {
    const dto = {
      cidade: "São Paulo",
      data: "2026-05-15",
      tempoDia: TempoValues.LIMPO,
      tempoNoite: TempoValues.LIMPO,
      temperaturaMinima: 20,
      temperaturaMaxima: 29,
      precipitacao: 50,
      umidade: 70,
      velocidadeDoVento: 9,
    };

    await repository.registrar(dto);

    expect(httpClient.post).toHaveBeenCalledWith("/dados-meteorologicos", dto);
  });

  it("deve retornar uma página de dados meteorológicos ao listar", async () => {
    const mockResponse = { data: { content: [], totalElements: 0 } };
    vi.mocked(httpClient.get).mockResolvedValue(mockResponse);

    const result = await repository.listar("Rio de Janeiro", 0);

    expect(httpClient.get).toHaveBeenCalledWith("/dados-meteorologicos", {
      params: { cidade: "Rio de Janeiro", page: 0, size: 8 },
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("deve buscar a previsão de 7 dias corretamente", async () => {
    const mockPrevisao = [{ data: "2026-05-13", temperatura: 22 }];
    vi.mocked(httpClient.get).mockResolvedValue({ data: mockPrevisao });

    const result = await repository.listar7Dias("Curitiba");

    expect(httpClient.get).toHaveBeenCalledWith(
      "/dados-meteorologicos/previsao",
      {
        params: { cidade: "Curitiba" },
      },
    );
    expect(result).toEqual(mockPrevisao);
  });
});
