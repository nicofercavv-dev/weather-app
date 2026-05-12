import styled from "styled-components";

export const WeatherInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > img {
    width: 83px;
  }

  & > p:first-child {
    font-size: 1.25rem;
    color: ${(props) => props.theme.colors.text};
  }

  & > p:last-child {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};
  }
`;
