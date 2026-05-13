import styled from "styled-components";

export const PrevisaoProximosDiasContainer = styled.table`
  width: 100%;
  height: 24.375rem;
  font-size: 1.5rem;
  margin-top: 1.25rem;
  color: ${(props) => props.theme.colors.text};

  & > tbody {
    width: 100%;
  }

  & > tbody > tr {
    box-sizing: border-box;
    height: 3.5625rem;
  }

  & > tbody > tr > td {
    box-sizing: border-box;
  }

  & > tbody > tr > td:first-child {
    height: 3.9375rem;
    text-align: center;
  }

  & > tbody > tr > td:nth-child(2) {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  & > tbody > tr > td > img {
    width: 3.5625rem;
  }
`;
