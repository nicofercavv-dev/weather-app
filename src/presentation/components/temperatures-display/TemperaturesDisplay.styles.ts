import styled from "styled-components";

export const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: sans-serif;
  color: white;
  padding: 20px;
  width: fit-content;
  border-radius: 8px;
`;

export const TempMax = styled.span`
  font-size: 4rem;
  font-weight: bold;
  line-height: 1;
  position: relative;

  &::after {
    content: "°";
    position: absolute;
    top: 5px;
    right: -15px;
    font-size: 1.5rem;
  }
`;

export const Separator = styled.span`
  font-size: 2.5rem;
  margin: 0 10px;
  font-weight: 300;
  transform: translateY(5px);
`;

export const TempMin = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  align-self: flex-end;
  margin-bottom: 8px;
  position: relative;

  &::after {
    content: "°";
    position: absolute;
    top: 0;
    right: -12px;
    font-size: 1rem;
  }
`;
