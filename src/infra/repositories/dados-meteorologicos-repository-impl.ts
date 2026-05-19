import type { DadosMeteorologicosRepository } from "../../core/contracts/dados-meteorologicos-repository";
import httpClient from "../../core/http/http-client";
import type { DadoMeteorologicoResponse } from "../../data/dtos/DadoMeteorologicoResponse.dto";
import type {
  DadosMeteorologicos,
  RegistrarDadosMeteorologicosDTO,
} from "../../domain/models/dados-meteorologicos";
import type { Page } from "../../types/page";

export class DadosMeteorologicosRepositoryImpl implements DadosMeteorologicosRepository {
  async registrar(dados: RegistrarDadosMeteorologicosDTO): Promise<void> {
    await httpClient.post("/dados-meteorologicos", dados);
  }

  async buscarPorId(id: number): Promise<DadoMeteorologicoResponse> {
    const response = await httpClient.get(`/dados-meteorologicos/${id}`);

    return response.data;
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
    const response = await httpClient.get("/dados-meteorologicos/previsao", {
      params: { cidade },
    });

    return response.data;
  }

  async editar(
    id: number,
    dados: RegistrarDadosMeteorologicosDTO,
  ): Promise<DadosMeteorologicos> {
    return await httpClient.put(`/dados-meteorologicos/${id}`, dados);
  }

  async deletar(id: number): Promise<void> {
    await httpClient.delete(`/dados-meteorologicos/${id}`);
  }
}
