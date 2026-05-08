import styled from "styled-components";

export const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  & > button {
    padding-left: 0;
    padding-right: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: ${(props) => props.theme.colors.text};
    font-weight: 600;
    font-size: 1.5rem;
  }

  & > span {
    color: ${(props) => props.theme.colors.text};
    font-weight: 600;
    font-size: 1.5rem;
    margin: 0 1rem;
  }
`;
