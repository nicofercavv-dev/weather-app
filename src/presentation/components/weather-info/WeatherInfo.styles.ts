import styled from "styled-components";

export const WeatherInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.3125rem;
  margin: 0 1.8125rem;

  & > img {
    width: 5.375rem;
  }

  & > p {
    margin: 0;
    font-size: 1.25rem;
    color: ${(props) => props.theme.colors.text};
  }

  & > p:last-child {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};
  }
`;
