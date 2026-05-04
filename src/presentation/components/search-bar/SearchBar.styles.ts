import styled from "styled-components";

export const SearchContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LabelStyled = styled.label`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

export const SearchInputWrapperStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const InputStyled = styled.input`
box-sizing: border-box;
  height: 3.5625rem;
  width: 23.125rem;
  border-radius: 0.9375rem;
  background-image: linear-gradient(
    ${(props) => props.theme.colors.purple100},
    ${(props) => props.theme.colors.purple200}
  );
  border: none;
  padding-left: 2rem;

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
  }
`;

export const SearchButtonStyled = styled.button`
  background: none;
  border: none;
`

export const ImageStyled = styled.img`
  width: auto;
`
