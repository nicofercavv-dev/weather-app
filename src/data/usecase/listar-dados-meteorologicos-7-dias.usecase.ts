import type { DadosMeteorologicosRepository } from "../../core/contracts/dados-meteorologicos-repository";
import type { DadosMeteorologicos } from "../../domain/models/dados-meteorologicos";

export class ListarDadosMeteorologicos7Dias {
  constructor(
    private readonly meteorologiaRepository: DadosMeteorologicosRepository,
  ) {}

  async execute(
    cidade: string,
  ): Promise<DadosMeteorologicos[]> {
    return await this.meteorologiaRepository.listar7Dias(cidade);
  }
}
