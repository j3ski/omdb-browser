import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useSelector } from "react-redux";

import { search } from "../services/movie/actions";
import { getList } from "../services/selectors";
import { getStore, saveInitialState } from "../store";
import { waitOnServer } from "../utils/env";

const MoviesList: NextPage = () => {
  const list = useSelector(getList);
  return (
    <>
      {list.items.map((item) => (
        <Link key={item.imdbID} href={`/${item.imdbID}`}>
          <a>{item.Title}</a>
        </Link>
      ))}
    </>
  );
};

MoviesList.getInitialProps = async ({ query }: NextPageContext) => {
  const store = getStore();
  if (query.search) {
    await waitOnServer(
      store.dispatch(search({ title: query.search as string }))
    );
  }

  return saveInitialState(store);
};

export default MoviesList;
