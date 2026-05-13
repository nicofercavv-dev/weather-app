import {
  Separator,
  TempMax,
  TempMin,
  WeatherContainer,
} from "./TemperaturesDisplay.styles";

export const TemperaturesDisplay = ({
  tempMin,
  tempMax,
}: {
  tempMin: number;
  tempMax: number;
}) => {
  return (
    <WeatherContainer>
      <TempMax>{tempMax}</TempMax>
      <Separator>/</Separator>
      <TempMin>{tempMin}</TempMin>
    </WeatherContainer>
  );
};
