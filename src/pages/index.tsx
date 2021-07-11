import { NextPage, NextPageContext } from "next";

import MovieList from "../containers/MovieList";
import { search } from "../services/movie/actions";
import { getStore, saveInitialState } from "../store";
import { waitOnServer } from "../utils/env";

const MovieListPage: NextPage = () => {
  return <MovieList />;
};

MovieListPage.getInitialProps = async ({ query }: NextPageContext) => {
  const store = getStore();
  if (query.search) {
    await waitOnServer(
      store.dispatch(search({ title: query.search as string }))
    );
  }

  return saveInitialState(store);
};

export default MovieListPage;
