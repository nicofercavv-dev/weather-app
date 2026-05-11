import { Separator, TempMax, TempMin, WeatherContainer } from "./TemperaturesDisplay.styles";

export const TemperaturesDisplay = () => {
  return (
    <WeatherContainer>
      <TempMax>23</TempMax>
      <Separator>/</Separator>
      <TempMin>17</TempMin>
    </WeatherContainer>
  );
};
