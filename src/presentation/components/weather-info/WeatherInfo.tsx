import { WeatherInfoContainer } from "./WeatherInfo.styles";

function WeatherInfo({
  src,
  title1,
  title2,
}: {
  src: string;
  title1: string;
  title2: string;
}) {
  
  return (
    <WeatherInfoContainer>
      <img src={src} alt="Ícone de informação" />
      <p>{title1}</p>
      <p>{title2}</p>
    </WeatherInfoContainer>
  );
}

export default WeatherInfo;
