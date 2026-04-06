import { HeaderStyled, LinkStyled } from "./Header.styles";

export default function Header() {
  return (
    <HeaderStyled>
      <LinkStyled to={"/"}>Home</LinkStyled>
      <LinkStyled to={"/cadastrar"}>Cadastrar</LinkStyled>
      <LinkStyled to={"/listar"}>Listar</LinkStyled>
    </HeaderStyled>
  );
}
