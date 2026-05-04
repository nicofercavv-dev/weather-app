import styled from "styled-components";

export const TableResponsiveStyled = styled.div`
  width: 100%;
`;

export const CidadeTableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;

  & > thead > tr > th {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.text};
    font-weight: 600;
  }

  & > thead > tr > th:first-child {
    text-align: left;
    padding-left: 2rem;
  }

  & > thead > tr > th:last-child {
    text-align: right;
    padding-right: 5.625rem;
  }

  & > tbody {
    width: 100%;
  }

  & > tbody > tr {
    background-image: linear-gradient(
      ${(props) => props.theme.colors.purple100Opacity29},
      ${(props) => props.theme.colors.purple200}
    );
    border: none;
    height: 3.375rem;
  }

  & > tbody > tr > td {
    font-size: 1.25rem;
    color: ${(props) => props.theme.colors.text};
    font-weight: 400;
    text-align: center;
  }

  & > tbody > tr > td:first-child {
    border-top-left-radius: 0.9375rem;
    border-bottom-left-radius: 0.9375rem;
    text-align: left;
    padding-left: 2rem;
  }

  & > tbody > tr > td:last-child {
    border-top-right-radius: 0.9375rem;
    border-bottom-right-radius: 0.9375rem;
    text-align: right;
    padding-right: 5.625rem;
  }
`;
