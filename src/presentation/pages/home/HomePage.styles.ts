import styled from "styled-components";

export const H1Styled = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-top: 0;
`;

export const SearchBarSectionStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.875rem;
`;
