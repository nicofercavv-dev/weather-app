import styled from "styled-components";

export const TableResponsiveStyled = styled.div`
  width: 100%;
  height: 37.8125rem;
`;

export const CidadeTableStyled = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.875rem;

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
    padding-right: 0;
  }

  & > tbody > tr > td:last-child {
    border-top-right-radius: 0.9375rem;
    border-bottom-right-radius: 0.9375rem;
    text-align: right;
    padding-right: 5.625rem;
    padding-left: 0;
  }

  & > tbody > tr > td:nth-child(2) {
    padding-left: 0;
    padding-right: 0;
  }

  & > tbody > tr > td > button {
    padding-left: 0;
    padding-right: 0;
    border: none;
    background: none;
    margin-left: 1.5625rem;
    cursor: pointer;
  }
`;

export const ImageStyled = styled.img`
  width: auto;
`
