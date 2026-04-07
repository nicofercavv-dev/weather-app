import type { DadosMeteorologicosRepository } from "../../core/contracts/dados-meteorologicos-repository";
import httpClient from "../../core/http/http-client";
import type { RegistrarDadosMeteorologicosDTO } from "../../domain/models/dados-meteorologicos";

export class DadosMeteorologicosRepositoryImpl implements DadosMeteorologicosRepository {
  async registrar(dados: RegistrarDadosMeteorologicosDTO): Promise<void> {
    await httpClient.post("/dados-meteorologicos", dados);
  }
}
