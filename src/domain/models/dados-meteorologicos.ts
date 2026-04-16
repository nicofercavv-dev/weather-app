import type { TempoValues } from "../../types/tempo-enum";

export interface DadosMeteorologicos {
  id: number;
  cidade: string;
  data: string;
  tempoDia: TempoValues;
  tempoNoite: TempoValues;
  temperaturaMaxima: number;
  temperaturaMinima: number;
  precipitacao: number;
  umidade: number;
  velocidadeDoVento: number;
}

export type RegistrarDadosMeteorologicosDTO = Omit<DadosMeteorologicos, "id">;
