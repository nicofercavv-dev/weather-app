import type { DadosMeteorologicosRepository } from "../../core/contracts/dados-meteorologicos-repository";
import httpClient from "../../core/http/http-client";
import type {
  DadosMeteorologicos,
  RegistrarDadosMeteorologicosDTO,
} from "../../domain/models/dados-meteorologicos";
import type { Page } from "../../types/page";

export class DadosMeteorologicosRepositoryImpl implements DadosMeteorologicosRepository {
  async registrar(dados: RegistrarDadosMeteorologicosDTO): Promise<void> {
    await httpClient.post("/dados-meteorologicos", dados);
  }

  async listar(
    cidade: string,
    page: number,
  ): Promise<Page<DadosMeteorologicos>> {
    const response = await httpClient.get("/dados-meteorologicos", {
      params: { cidade, page, size: 8 },
    });

    return response.data;
  }

  async listar7Dias(cidade: string): Promise<DadosMeteorologicos[]> {
    const response = await httpClient.get("/previsao", {
      params: { cidade },
    });

    return response.data;
  }
}
