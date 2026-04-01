import { NavLink } from "react-router";
import styled from "styled-components";

export const HeaderStyled = styled.header`
  background-image: linear-gradient(
    ${(props) => props.theme.colors.purple100Opacity50},
    ${(props) => props.theme.colors.purple200Opacity50}
  );
  height: 4.5rem;
  margin: 1.375rem 1.75rem;
  border-radius: 0.9375rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2.4375rem;
  padding-left: 3.0625rem;
`;

export const LinkStyled = styled(NavLink)`
  color: ${(props) => props.theme.colors.text};
  font-size: 2rem;
  font-weight: 600;
  text-decoration: none;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.1rem;
    left: -5%;
    width: 110%;
    height: 0.125rem;
    background-color: ${(props) => props.theme.colors.white};

    transition: transform 0.2s ease-in-out;
    transform: scaleX(0);
    transform-origin: center;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &.active::after {
    transform: scaleX(1);
  }
`;
