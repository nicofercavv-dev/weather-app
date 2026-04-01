import styled from "styled-components";

export const FooterStyled = styled.footer`
  background-image: linear-gradient(
    ${(props) => props.theme.colors.purple100Opacity50},
    ${(props) => props.theme.colors.purple200Opacity50}
  );
  height: 4.5rem;
  margin: 1.375rem 1.75rem;
  border-radius: 0.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  p {
    color: ${(props) => props.theme.colors.text};
    font-weight: 400;
    font-size: 1.25rem;
  }
`;
