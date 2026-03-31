import { useForm } from "react-hook-form";
import FormularioMeterologico from "../../components/formulario-meteorologico/FormularioMeterologico";
import { H1Styled } from "./CadastrarPage.styles";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { TempoValues } from "../../../types/tempo-enum";

const DadosMeteorologicosSchema = z.strictObject({
  cidade: z
    .string("Cidade é obrigatória")
    .min(2, "O nome da cidade deve ter pelo menos 2 caracteres"),
  data: z.iso.date({ error: "Data inválida" }),
  tempoDia: z.enum(TempoValues, "Tempo Dia é obrigatório"),
  tempoNoite: z.enum(TempoValues, "Tempo Noite é obrigatório"),
  temperaturaMaxima: z.coerce.number("Temperatura Máxima é obrigatória"),
  temperaturaMinima: z.coerce.number("Temperatura Mínima é obrigatória"),
  precipitacao: z.coerce
    .number("Precipitação é obrigatória")
    .min(0, "Precipitação deve ser entre 0% e 100%")
    .max(100, "Precipitação deve ser entre 0% e 100%"),
  umidade: z.coerce
    .number("Umidade é obrigatória")
    .min(0, "Umidade deve ser entre 0% e 100%")
    .max(100, "Umidade deve ser entre 0% e 100%"),
  velocidadeDoVento: z.coerce
    .number("Velocidade do vento é obrigatória")
    .min(0, "A velocidade não pode ser menor que 0km/h"),
});

export type DadosMeteorologicos = z.infer<typeof DadosMeteorologicosSchema>;

export default function CadastrarPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DadosMeteorologicos>({
    resolver: zodResolver(DadosMeteorologicosSchema) as any,
  });

  const onSubmit = (data: DadosMeteorologicos) => {
    // TODO: Integrar chamada para cadastro no backend 
    console.log("Form: ", data);

    toast.success("Informações enviadas com sucesso", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const onError = () => {
    toast.error("Existem campos inválidos no formulário", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  return (
    <div>
      <H1Styled>Cadastro Meteorológico</H1Styled>
      <FormularioMeterologico
        onSubmit={handleSubmit(onSubmit, onError)}
        errors={errors}
        register={register}
        control={control}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
