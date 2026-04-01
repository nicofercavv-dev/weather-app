import styled from "styled-components";

export const TemplateContainer = styled.div`
  background-image: linear-gradient(
    ${(props) => props.theme.colors.purple400},
    ${(props) => props.theme.colors.purple500},
    ${(props) => props.theme.colors.wine50}
  );
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PageContentContainer = styled.main`
  width: 88%;
  margin: 0 auto;
`;
