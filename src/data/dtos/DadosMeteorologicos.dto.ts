import z from "zod";
import { TempoValues } from "../../types/tempo-enum";

export const DadosMeteorologicosSchema = z.strictObject({
  cidade: z
    .string("Cidade é obrigatória")
    .min(2, "O nome da cidade deve ter pelo menos 2 caracteres"),
  data: z.iso.date({ error: "Data inválida" }),
  tempoDia: z.enum(TempoValues, "Tempo Dia é obrigatório"),
  tempoNoite: z.enum(TempoValues, "Tempo Noite é obrigatório"),
  temperaturaMaxima: z.number("Temperatura Máxima é obrigatória"),
  temperaturaMinima: z.number("Temperatura Mínima é obrigatória"),
  precipitacao: z
    .number("Precipitação é obrigatória")
    .min(0, "Precipitação deve ser entre 0% e 100%")
    .max(100, "Precipitação deve ser entre 0% e 100%"),
  umidade: z
    .number("Umidade é obrigatória")
    .min(0, "Umidade deve ser entre 0% e 100%")
    .max(100, "Umidade deve ser entre 0% e 100%"),
  velocidadeDoVento: z
    .number("Velocidade do vento é obrigatória")
    .min(0, "A velocidade não pode ser menor que 0km/h"),
});

export type DadosMeteorologicosForm = z.infer<typeof DadosMeteorologicosSchema>;
