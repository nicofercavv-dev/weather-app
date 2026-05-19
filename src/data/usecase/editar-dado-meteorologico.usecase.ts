import type { DadosMeteorologicosRepository } from "../../core/contracts/dados-meteorologicos-repository";
import type { DadosMeteorologicos, RegistrarDadosMeteorologicosDTO } from "../../domain/models/dados-meteorologicos";

export class EditarDadoMeteorologico {
  constructor(
    private readonly meteorologiaRepository: DadosMeteorologicosRepository,
  ) {}

  async execute(id: number, dados: RegistrarDadosMeteorologicosDTO): Promise<DadosMeteorologicos> {
    return await this.meteorologiaRepository.editar(id, dados);
  }
}
