import type { RegistrarDadosMeteorologicosDTO } from "../../domain/models/dados-meteorologicos";

export interface DadosMeteorologicosRepository {
  registrar(dados: RegistrarDadosMeteorologicosDTO): Promise<void>;
}
