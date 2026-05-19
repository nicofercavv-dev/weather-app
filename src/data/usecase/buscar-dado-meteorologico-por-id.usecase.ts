import type { DadosMeteorologicosRepository } from "../../core/contracts/dados-meteorologicos-repository";
import type { DadoMeteorologicoResponse } from "../dtos/DadoMeteorologicoResponse.dto";

export class BuscarDadoMeteorologicoPorId {
  constructor(
    private readonly meteorologiaRepository: DadosMeteorologicosRepository,
  ) {}

  async execute(id: number): Promise<DadoMeteorologicoResponse> {
    return await this.meteorologiaRepository.buscarPorId(id);
  }
}
