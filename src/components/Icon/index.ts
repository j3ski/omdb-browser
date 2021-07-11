import styled from "styled-components";

const Icon = styled.i<{ $name: "search"; $size?: number }>`
  display: block;
  background: url("icons/${({ $name }) => $name}.svg");
  width: ${({ $size = 24 }) => $size}px;
  height: ${({ $size = 24 }) => $size}px;
`;

export default Icon;
