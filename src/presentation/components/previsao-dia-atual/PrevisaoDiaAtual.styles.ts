import styled from "styled-components";

export const PrevisaoDiaAtualContainerStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 11.625rem;
  background-image: linear-gradient(
    ${(props) => props.theme.colors.purple100},
    ${(props) => props.theme.colors.purple200}
  );
  border-radius: 0.9375rem;
  padding: 0 3.3125rem 0 4.9375rem;

  & > .temperature {
    display: flex;

    img {
      width: 10.5625rem;
    }
  }

  & > .infos {
    display: flex;
  }
`;
