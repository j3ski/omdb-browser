import styled, { css, keyframes } from "styled-components";

type Name = "search" | "sync" | "back";

const rotate = keyframes`
0% {
  transform: rotate(0deg)
}
100% {
  transform: rotate(360deg)
}`;

const Icon = styled.i<{ $name: Name; $size?: number; $rotate?: boolean }>`
  display: block;
  background: url("icons/${({ $name }) => $name}.svg");
  width: ${({ $size = 24 }) => $size}px;
  height: ${({ $size = 24 }) => $size}px;

  ${({ $rotate }) =>
    $rotate &&
    css`
      animation: ${rotate} 1s infinite linear;
    `}
`;

export default Icon;
