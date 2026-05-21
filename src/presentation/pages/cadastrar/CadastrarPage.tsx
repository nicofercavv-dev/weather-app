import { useForm } from "react-hook-form";
import FormularioMeteorologico from "../../components/formulario-meteorologico/FormularioMeteorologico";
import { H1Styled } from "./CadastrarPage.styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { DadosMeteorologicosRepositoryImpl } from "../../../infra/repositories/dados-meteorologicos-repository-impl";
import { RegistrarDadosMeteorologicos } from "../../../data/usecase/registrar-dados-meteorologicos.usecase";
import { useNavigate } from "react-router";
import { DadosMeteorologicosSchema, type DadosMeteorologicosForm } from "../../../data/dtos/DadosMeteorologicos.dto";

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

  console.log("Erros de validação atuais:", errors);

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
