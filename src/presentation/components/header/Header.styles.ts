import { NavLink } from "react-router";
import styled from "styled-components";

export const HeaderStyled = styled.header`
  background-image: linear-gradient(
    rgba(149, 125, 205, 0.5),
    rgba(82, 61, 127, 0.5)
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
  color: #ffffff;
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
    background-color: #ffffff;

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
