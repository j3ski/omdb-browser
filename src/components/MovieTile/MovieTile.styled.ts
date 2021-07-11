import styled from "styled-components";

export const TileWrapper = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Poster = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.fade};
`;

export const Title = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
