import { useForm } from "react-hook-form";
import FormularioMeteorologico from "../../components/formulario-meteorologico/FormularioMeteorologico";
import { H1Styled } from "./EditarPage.styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { DadosMeteorologicosRepositoryImpl } from "../../../infra/repositories/dados-meteorologicos-repository-impl";
import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useMemo } from "react";
import { BuscarDadoMeteorologicoPorId } from "../../../data/usecase/buscar-dado-meteorologico-por-id.usecase";
import { EditarDadoMeteorologico } from "../../../data/usecase/editar-dado-meteorologico.usecase";
import {
  DadosMeteorologicosSchema,
  type DadosMeteorologicosForm,
} from "../../../data/dtos/DadosMeteorologicos.dto";

export default function EditarPage() {
  const repository = useMemo(() => new DadosMeteorologicosRepositoryImpl(), []);

  const buscarPorIdUseCase = useMemo(
    () => new BuscarDadoMeteorologicoPorId(repository),
    [repository],
  );
  const editarUseCase = useMemo(
    () => new EditarDadoMeteorologico(repository),
    [repository],
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<DadosMeteorologicosForm>({
    resolver: zodResolver(DadosMeteorologicosSchema),
  });

  const onSubmit = async (data: DadosMeteorologicosForm) => {
    try {
      await editarUseCase.execute(Number(id), data);
      toast.success("Informações salvas com sucesso");
      navigate("/listar");
    } catch (error) {
      toast.error("Erro ao salvar os dados");
      console.error(error);
    }
  };

  const onError = () => {
    toast.error("Existem campos inválidos no formulário");
  };

  const fetchDado = useCallback(
    async (id: number) => {
      try {
        const response = await buscarPorIdUseCase.execute(id);
        setValue("cidade", response.cidade);
        setValue("data", response.dataRegistro);
        setValue("tempoDia", response.tempoDia);
        setValue("tempoNoite", response.tempoNoite);
        setValue("temperaturaMaxima", response.temperaturaMaxima);
        setValue("temperaturaMinima", response.temperaturaMinima);
        setValue("precipitacao", response.precipitacao);
        setValue("umidade", response.umidade);
        setValue("velocidadeDoVento", response.velocidadeVento);
      } catch (error) {
        console.error("Erro ao buscar dado meteorológico:", error);
      }
    },
    [buscarPorIdUseCase, setValue],
  );

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (active) {
        await fetchDado(Number(id));
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [id, fetchDado]);

  return (
    <div>
      <H1Styled>Editar Dado Meteorológico</H1Styled>
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
