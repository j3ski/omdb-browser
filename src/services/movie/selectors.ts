import { createSelector } from "@reduxjs/toolkit";

import type { State } from "../../store";
import { IByIdOrTitleResponse } from "./api/types";
import { NAME } from "./const";

const getState = (state: State) => state[NAME];

export const getList = createSelector(getState, ({ list, total }) => ({
  total: total,
  items: list,
}));

export const getSearching = createSelector(
  getState,
  ({ searching }) => searching
);

export const getError = createSelector(getState, ({ error }) => error);

export const getDetailsById = createSelector(
  getState,
  (_: State, id: string) => id,
  ({ list, detailsById }, id) =>
    (detailsById[id] ||
      list.find((item) => item.imdbID === id) ||
      null) as IByIdOrTitleResponse
);

export const getFetchingDetails = createSelector(
  getState,
  ({ fetching }) => fetching
);
