import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";

import { getById } from "../services/movie/actions";
import { getDetailsById } from "../services/movie/selectors";
import { getStore, saveInitialState, Store } from "../store";
import { waitOnServer } from "../utils/env";

const MovieDetails: NextPage = () => {
  const router = useRouter();
  const movieDetails = useSelector((state) =>
    getDetailsById(state, router.query.id as string)
  );

  return (
    <div>
      <div>{movieDetails.Title}</div>
      <div>{movieDetails?.Plot}</div>
    </div>
  );
};

MovieDetails.getInitialProps = async ({ query }: NextPageContext) => {
  const store = getStore();
  await waitOnServer(store.dispatch(getById(query.id as string)));

  return saveInitialState(store);
};

export default MovieDetails;
