import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieSearch from "../../components/MovieSearch";
import MovieTile from "../../components/MovieTile";
import * as movieActions from "../../services/movie/actions";
import * as movieSelectors from "../../services/movie/selectors";
import * as S from "./MovieList.styled";

const MovieList: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const list = useSelector(movieSelectors.getList);
  const error = useSelector(movieSelectors.getError);
  const loading = useSelector(movieSelectors.getSearching);

  const [search, setSearch] = useState<string>(
    decodeURIComponent(router.query.search as string) || ""
  );

  useEffect(() => {
    if (!search) {
      return;
    }
    dispatch(movieActions.search({ title: search }));
  }, [search, dispatch]);

  const routerRef = useRef(router);
  routerRef.current = router;
  useEffect(() => {
    const currentRouter = routerRef.current;
    currentRouter.push({
      pathname: currentRouter.pathname,
      query: {
        ...currentRouter.query,
        search,
      },
    });
  }, [search]);

  return (
    <>
      <S.SearchWrapper>
        <MovieSearch value={search} onChange={setSearch} debounce={250} />
      </S.SearchWrapper>
      <S.ListWrapper>
        <S.List>
          {list.items.map((item) => (
            <Link key={item.imdbID} href={`/${item.imdbID}`}>
              <a>
                <MovieTile movie={item} />
              </a>
            </Link>
          ))}
        </S.List>
      </S.ListWrapper>
    </>
  );
};

export default MovieList;
