import styled from "styled-components";

export const SearchWrapper = styled.section`
  height: 60px;
  position: sticky;
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
