import type { DadosMeteorologicosRepository } from "../../core/contracts/dados-meteorologicos-repository";
import type { DadosMeteorologicos } from "../../domain/models/dados-meteorologicos";
import type { Page } from "../../types/page";

export class ListarDadosMeteorologicos {
  constructor(
    private readonly meteorologiaRepository: DadosMeteorologicosRepository,
  ) {}

  async execute(
    cidade: string,
    page: number,
  ): Promise<Page<DadosMeteorologicos>> {
    return await this.meteorologiaRepository.listar(cidade, page);
  }
}
