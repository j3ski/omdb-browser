import { NextPage, NextPageContext } from "next";

import MovieDetails from "../containers/MovieDetails";
import { getById } from "../services/movie/actions";
import { getStore, saveInitialState } from "../store";
import { waitOnServer } from "../utils/env";

const MovieDetailsPage: NextPage = () => {
  return <MovieDetails />;
};

MovieDetailsPage.getInitialProps = async ({ query }: NextPageContext) => {
  const store = getStore();
  await waitOnServer(store.dispatch(getById(query.id as string)));

  return saveInitialState(store);
};

export default MovieDetailsPage;
