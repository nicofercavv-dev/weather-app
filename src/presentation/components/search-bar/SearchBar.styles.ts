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
  padding-left: 2rem;
  outline: none;
  border: 0.125rem solid transparent;
  transition: all 0.3s ease-in-out;

  color: ${(props) => props.theme.colors.text};

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.purple50};
    box-shadow: 0 0 0.5rem ${(props) => props.theme.colors.purple50Opacity60};
  }

  &:focus-visible {
    outline: none;
    border-color: ${(props) => props.theme.colors.white};
    box-shadow:
      0 0 0 0.125rem ${(props) => props.theme.colors.purple300},
      0 0 0 0.25rem ${(props) => props.theme.colors.purple50};
  }
`;

export const SearchButtonStyled = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const ImageStyled = styled.img`
  width: auto;
`;
