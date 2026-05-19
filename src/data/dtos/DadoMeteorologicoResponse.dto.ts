import type { TempoValues } from "../../types/tempo-enum";

export interface DadoMeteorologicoResponse {
  cidade: string;
  data: string;
  tempoDia: TempoValues;
  tempoNoite: TempoValues;
  temperaturaMaxima: number;
  temperaturaMinima: number;
  precipitacao: number;
  umidade: number;
  velocidadeVento: number;
}
