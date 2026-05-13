import { TemperaturesDisplay } from "../temperatures-display/TemperaturesDisplay";
import WeatherInfo from "../weather-info/WeatherInfo";
import { PrevisaoDiaAtualContainerStyled } from "./PrevisaoDiaAtual.styles";
import precipitacao from "../../../assets/precipitacao.png";
import umidade from "../../../assets/umidade.png";
import vento from "../../../assets/vento.png";
import type { DadosMeteorologicos } from "../../../domain/models/dados-meteorologicos";
import { WEATHER_ICONS } from "../../../types/weather-icons";
import { TempoValues } from "../../../types/tempo-enum";

function PrevisaoDiaAtual({
  dadoMeteorologico,
}: {
  dadoMeteorologico: DadosMeteorologicos;
}) {
  const tempoDia = dadoMeteorologico?.tempoDia;
  const imageSrc = WEATHER_ICONS[tempoDia] || WEATHER_ICONS[TempoValues.NEVE];
  return (
    <PrevisaoDiaAtualContainerStyled>
      <div className="temperature">
        <img src={imageSrc} alt="Ícone clima" />
        <TemperaturesDisplay
          tempMin={dadoMeteorologico?.temperaturaMinima}
          tempMax={dadoMeteorologico?.temperaturaMaxima}
        />
      </div>
      <div className="infos">
        <WeatherInfo
          src={precipitacao}
          title1={`${dadoMeteorologico?.precipitacao}%`}
          title2="Precipitação"
        />
        <WeatherInfo
          src={umidade}
          title1={`${dadoMeteorologico?.umidade}%`}
          title2="Umidade"
        />
        <WeatherInfo
          src={vento}
          title1={`${dadoMeteorologico?.velocidadeDoVento}km/h`}
          title2="Velocidade Vento"
        />
      </div>
    </PrevisaoDiaAtualContainerStyled>
  );
}

export default PrevisaoDiaAtual;
