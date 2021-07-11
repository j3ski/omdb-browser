import Link from "next/link";
import type { FC } from "react";
import { useSelector } from "react-redux";

import IntersectionObserverComponent from "../../components/IntersectionObserver";
import MovieSearch from "../../components/MovieSearch";
import MovieTile from "../../components/MovieTile";
import * as movieSelectors from "../../services/movie/selectors";
import { usePagination, useSearch } from "./hooks";
import * as S from "./MovieList.styled";

const MovieList: FC = () => {
  const list = useSelector(movieSelectors.getList);
  const error = useSelector(movieSelectors.getError);
  const loading = useSelector(movieSelectors.getSearching);

  const [search, setSearch] = useSearch();
  const [onLoadMore, bind] = usePagination(
    search,
    !loading && !error && list.items.length < list.total,
    list.items.length / 10 + 1
  );

  return (
    <>
      <S.SearchWrapper>
        <MovieSearch
          value={search}
          onChange={setSearch}
          debounce={250}
          loading={loading}
        />
      </S.SearchWrapper>
      <S.ListWrapper {...bind}>
        {error ? (
          <S.ErrorMessage>{error.message}</S.ErrorMessage>
        ) : (
          <S.List>
            {list.items.map((item) => (
              <Link key={item.imdbID} href={`/${item.imdbID}`}>
                <a>
                  <MovieTile movie={item} />
                </a>
              </Link>
            ))}
            <IntersectionObserverComponent
              onIntersection={onLoadMore}
              root={bind.ref}
              config={{
                threshold: 0,
                rootMargin: "600px",
              }}
            />
          </S.List>
        )}
      </S.ListWrapper>
    </>
  );
};

export default MovieList;
