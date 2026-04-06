import { FooterStyled } from "./Footer.styles";
import dbLogo from "../../../assets/db-logo.svg";

export default function Footer() {
  return (
    <FooterStyled>
      <p>make with love</p>
      <img src={dbLogo} alt="Logo da DB" />
    </FooterStyled>
  );
}
