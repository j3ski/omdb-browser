import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import * as movieActions from "../../services/movie/actions";

export const useSearch = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>(
    router.query.search ? decodeURIComponent(router.query.search as string) : ""
  );

  const routerRef = useRef(router);
  routerRef.current = router;
  useEffect(() => {
    const currentRouter = routerRef.current;
    // NOTE: this will trigger getInitialProps, which will trigger the API call
    currentRouter.replace({
      pathname: currentRouter.pathname,
      query: {
        ...currentRouter.query,
        search,
      },
    });
  }, [search]);

  return [search, setSearch] as const;
};

export const usePagination = (
  search: string,
  shouldFetchMore: boolean,
  page: number
) => {
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLElement>(null);
  const handleLoadMore = useCallback(() => {
    if (!shouldFetchMore) {
      return;
    }

    dispatch(movieActions.search({ title: search, page }));
  }, [dispatch, shouldFetchMore, page, search]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [search]);

  return [handleLoadMore, { ref: scrollRef }] as const;
};
