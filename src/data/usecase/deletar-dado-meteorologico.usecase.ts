import type { DadosMeteorologicosRepository } from "../../core/contracts/dados-meteorologicos-repository";

export class DeletarDadoMeteorologico {
  constructor(
    private readonly meteorologiaRepository: DadosMeteorologicosRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.meteorologiaRepository.deletar(id);
  }
}
