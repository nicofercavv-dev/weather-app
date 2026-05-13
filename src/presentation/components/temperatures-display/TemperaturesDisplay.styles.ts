import styled from "styled-components";

export const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: sans-serif;
  color: white;
  padding: 1.25rem;
  width: fit-content;
  border-radius: 0.5rem;
`;

export const TempMax = styled.span`
  font-size: 4rem;
  font-weight: bold;
  line-height: 1;
  position: relative;

  &::after {
    content: "°";
    position: absolute;
    top: 0.3125rem;
    right: -0.9375rem;
    font-size: 1.5rem;
  }
`;

export const Separator = styled.span`
  font-size: 2.5rem;
  margin: 0 0.625rem;
  font-weight: 300;
  transform: translateY(0.3125rem);
`;

export const TempMin = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  align-self: flex-end;
  margin-bottom: 0.5rem;
  position: relative;

  &::after {
    content: "°";
    position: absolute;
    top: 0;
    right: -0.75rem;
    font-size: 1rem;
  }
`;
