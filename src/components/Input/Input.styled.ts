import styled from "styled-components";

export const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
`;

export const Wrapper = styled.label`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  display: block;
  padding: 8px;
  display: flex;
`;
