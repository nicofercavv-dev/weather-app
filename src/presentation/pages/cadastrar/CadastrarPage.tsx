import { useForm } from "react-hook-form";
import FormularioMeteorologico from "../../components/formulario-meteorologico/FormularioMeteorologico";
import { H1Styled } from "./CadastrarPage.styles";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { TempoValues } from "../../../types/tempo-enum";
import { DadosMeteorologicosRepositoryImpl } from "../../../infra/repositories/dados-meteorologicos-repository-impl";
import { RegistrarDadosMeteorologicos } from "../../../data/usecase/registrar-dados-meteorologicos";
import { useNavigate } from "react-router";

const DadosMeteorologicosSchema = z.strictObject({
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

export default function CadastrarPage() {
  const repository = new DadosMeteorologicosRepositoryImpl();
  const registrarUseCase = new RegistrarDadosMeteorologicos(repository);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DadosMeteorologicosForm>({
    resolver: zodResolver(DadosMeteorologicosSchema),
  });

  const onSubmit = async (data: DadosMeteorologicosForm) => {
    try {
      await registrarUseCase.execute(data);
      toast.success("Informações enviadas com sucesso");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao salvar os dados");
      console.error(error);
    }
  };

  const onError = () => {
    toast.error("Existem campos inválidos no formulário");
  };

  return (
    <div>
      <H1Styled>Cadastro Meteorológico</H1Styled>
      <FormularioMeteorologico
        onSubmit={handleSubmit(onSubmit, onError)}
        errors={errors}
        register={register}
        control={control}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
