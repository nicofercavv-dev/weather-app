export enum TempoValues {
  SOL = "SOL",
  LIMPO = "LIMPO",
  CHUVA = "CHUVA",
  TEMPESTADE = "TEMPESTADE",
  SOL_COM_NUVENS = "SOL_COM_NUVENS",
  NEVE = "NEVE",
  NUBLADO = "NUBLADO",
}

export const TempoLabels: Record<TempoValues, string> = {
  [TempoValues.SOL]: "Sol",
  [TempoValues.LIMPO]: "Limpo",
  [TempoValues.CHUVA]: "Chuva",
  [TempoValues.TEMPESTADE]: "Tempestade",
  [TempoValues.SOL_COM_NUVENS]: "Sol com Nuvens",
  [TempoValues.NEVE]: "Neve",
  [TempoValues.NUBLADO]: "Nublado",
};
