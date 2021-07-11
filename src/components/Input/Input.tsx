import { FC, InputHTMLAttributes } from "react";

import * as S from "./Input.styled";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  ...inputProps
}) => (
  <S.Wrapper>
    {children}
    <S.Input {...inputProps} />
  </S.Wrapper>
);

export default Input;
