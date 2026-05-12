import { TemperaturesDisplay } from "../temperatures-display/TemperaturesDisplay";
import WeatherInfo from "../weather-info/WeatherInfo";
import { PrevisaoDiaAtualContainerStyled } from "./PrevisaoDiaAtual.styles";
import precipitacao from "../../../assets/precipitacao.png";
import umidade from "../../../assets/umidade.png";
import vento from "../../../assets/vento.png";

function PrevisaoDiaAtual() {
  return (
    <PrevisaoDiaAtualContainerStyled>
      <div>
        <img src="" alt="" />
        <TemperaturesDisplay />
      </div>

      <div>
        <WeatherInfo src={precipitacao} title1={"30%"} title2="Precipitação" />
        <WeatherInfo src={umidade} title1={"20%"} title2="Umidade" />
        <WeatherInfo src={vento} title1={"9km/h"} title2="Velocidade Vento" />
      </div>
    </PrevisaoDiaAtualContainerStyled>
  );
}

export default PrevisaoDiaAtual;
