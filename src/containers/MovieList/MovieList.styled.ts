import styled from "styled-components";

export const SearchWrapper = styled.section`
  height: 48px;
  position: sticky;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

export const ListWrapper = styled.section`
  flex-grow: 1;
  overflow: auto;
  margin-top: 20px;
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.highlight};
  color: ${({ theme }) => theme.colors.background};
  padding: 8px;
`;
