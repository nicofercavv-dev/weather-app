import type { DadosMeteorologicos } from "../../../domain/models/dados-meteorologicos";
import { TempoLabels } from "../../../types/tempo-enum";
import { WEATHER_ICONS } from "../../../types/weather-icons";
import { PrevisaoProximosDiasContainer } from "./PrevisaoProximosDias.styles";

export function PrevisaoProximosDias({
  dadosMeteorologicos,
}: {
  dadosMeteorologicos: DadosMeteorologicos[];
}) {
  return (
    <PrevisaoProximosDiasContainer>
      <tbody>
        {dadosMeteorologicos.length ? (
          dadosMeteorologicos.map((dado) => {
            const imageSrc = WEATHER_ICONS[dado.tempoDia];
            return (
              <tr key={dado.id}>
                <td>{dado.data.split("-").reverse().join("/")}</td>
                <td>
                  <img src={imageSrc} alt={TempoLabels[dado.tempoDia]} />
                  {TempoLabels[dado.tempoDia]}
                </td>
                <td>
                  {dado.temperaturaMinima}° {dado.temperaturaMaxima}°
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>Sem Dados</td>
          </tr>
        )}
      </tbody>
    </PrevisaoProximosDiasContainer>
  );
}
