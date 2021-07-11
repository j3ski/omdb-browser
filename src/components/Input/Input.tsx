import { FC, InputHTMLAttributes, ReactNode } from "react";

import * as S from "./Input.styled";

interface Props {
  left?: ReactNode;
  right?: ReactNode;
}

const Input: FC<InputHTMLAttributes<HTMLInputElement> & Props> = ({
  left,
  right,
  ...inputProps
}) => (
  <S.Wrapper>
    {left}
    <S.Input {...inputProps} />
    {right}
  </S.Wrapper>
);

export default Input;
