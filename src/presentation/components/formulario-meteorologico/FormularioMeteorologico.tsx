import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { DadosMeteorologicosForm } from "../../pages/cadastrar/CadastrarPage";
import type { SubmitEventHandler } from "react";
import { FormStyled } from "./FormularioMeteorologico.styles";
import { NumericFormat } from "react-number-format";
import { TempoLabels, TempoValues } from "../../../types/tempo-enum";
import { useNavigate } from "react-router";

function FormularioMeteorologico({
  onSubmit,
  errors,
  register,
  control,
  isSubmitting,
}: {
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  errors: FieldErrors<DadosMeteorologicosForm>;
  register: UseFormRegister<DadosMeteorologicosForm>;
  control: Control<DadosMeteorologicosForm>;
  isSubmitting: boolean;
}) {
  const navigate = useNavigate();

  const tempoOptions = Object.values(TempoValues).map((valor) => (
    <option key={valor} value={valor}>
      {TempoLabels[valor]}
    </option>
  ));

  return (
    <FormStyled onSubmit={onSubmit}>
      <fieldset className="fieldset-cidade-data">
        <div>
          <label>
            Cidade
            <input {...register("cidade")} />
            {errors.cidade && (
              <span className="error-span">{errors.cidade.message}</span>
            )}
          </label>
        </div>
        <label>
          Data
          <input
            type="date"
            {...register("data")}
            onClick={(e) => e.currentTarget.showPicker()}
          />
          {errors.data && (
            <span className="error-span">{errors.data.message}</span>
          )}
        </label>
      </fieldset>
      <fieldset className="fieldset-valores">
        <label className="input-linha-1">
          Tempo Dia
          <select {...register("tempoDia")}>
            <option value="">Selecione</option>
            {tempoOptions}
          </select>
          {errors.tempoDia && (
            <span className="error-span">{errors.tempoDia.message}</span>
          )}
        </label>
        <label className="input-linha-1">
          Tempo Noite
          <select {...register("tempoNoite")}>
            <option value="">Selecione</option>
            {tempoOptions}
          </select>
          {errors.tempoNoite && (
            <span className="error-span">{errors.tempoNoite.message}</span>
          )}
        </label>
        <label className="input-linha-1">
          Temperatura Máxima
          <Controller
            name="temperaturaMaxima"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <NumericFormat
                className="small-input"
                name={name}
                value={value}
                suffix="°"
                allowNegative
                onValueChange={(values) => onChange(values.floatValue)}
              />
            )}
          />
          {errors.temperaturaMaxima && (
            <span className="error-span">
              {errors.temperaturaMaxima.message}
            </span>
          )}
        </label>
        <label className="input-linha-1">
          Temperatura Mínima
          <Controller
            name="temperaturaMinima"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <NumericFormat
                className="small-input"
                name={name}
                value={value}
                suffix="°"
                allowNegative
                onValueChange={(values) => onChange(values.floatValue)}
              />
            )}
          />
          {errors.temperaturaMinima && (
            <span className="error-span">
              {errors.temperaturaMinima.message}
            </span>
          )}
        </label>
        <label className="input-linha-2">
          Precipitação
          <Controller
            name="precipitacao"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <NumericFormat
                className="small-input"
                name={name}
                value={value}
                suffix="%"
                decimalScale={0}
                onValueChange={(values) => onChange(values.floatValue)}
              />
            )}
          />
          {errors.precipitacao && (
            <span className="error-span">{errors.precipitacao.message}</span>
          )}
        </label>
        <label className="input-linha-2">
          Umidade
          <Controller
            name="umidade"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <NumericFormat
                className="small-input"
                name={name}
                value={value}
                suffix="%"
                decimalScale={0}
                onValueChange={(values) => onChange(values.floatValue)}
              />
            )}
          />
          {errors.umidade && (
            <span className="error-span">{errors.umidade.message}</span>
          )}
        </label>
        <label className="input-linha-2">
          Velocidade do Vento
          <Controller
            name="velocidadeDoVento"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <NumericFormat
                className="small-input"
                name={name}
                value={value}
                suffix="km/h"
                decimalScale={0}
                onValueChange={(values) => onChange(values.floatValue)}
              />
            )}
          />
          {errors.velocidadeDoVento && (
            <span className="error-span">
              {errors.velocidadeDoVento.message}
            </span>
          )}
        </label>
      </fieldset>
      <div className="actions">
        <button
          type="button"
          className="cancelar"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Salvar"}
        </button>
      </div>
    </FormStyled>
  );
}

export default FormularioMeteorologico;
