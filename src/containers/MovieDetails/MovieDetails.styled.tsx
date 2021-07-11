import styled from "styled-components";

import Icon from "../../components/Icon";

export const Header = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`;

export const Title = styled.h1`
  margin: 0;
  margin-left: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const BackButton = styled(Icon).attrs({ as: "button", $name: "back" })`
  outline: none;
  border: none;
  cursor: pointer;
  flex: 0;
  flex-basis: 24px;
`;

export const Poster = styled.div`
  width: 100%;
  padding-top: 100%;
  max-width: 400px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.fade};
`;

export const Content = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  max-width: 800px;
  margin: 16px auto;
  width: 100%;
  overflow: auto;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const Plot = styled.article`
  grid-column: span 2;
  @media (max-width: 800px) {
    grid-column: span 1;
  }
`;

export const Detail = styled.div`
  margin: 16px 0;
`;

export const DetailGroup = styled.div``;
