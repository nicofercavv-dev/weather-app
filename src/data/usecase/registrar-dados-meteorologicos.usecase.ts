import type { DadosMeteorologicosRepository } from "../../core/contracts/dados-meteorologicos-repository";
import type { RegistrarDadosMeteorologicosDTO } from "../../domain/models/dados-meteorologicos";

export class RegistrarDadosMeteorologicos {
  constructor(private readonly meteorologiaRepository: DadosMeteorologicosRepository) {}

  async execute(params: RegistrarDadosMeteorologicosDTO): Promise<void> {
    await this.meteorologiaRepository.registrar(params);
  }
}
