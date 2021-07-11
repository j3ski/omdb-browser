import { createReducer } from "@reduxjs/toolkit";

import * as actions from "./actions";
import { IByIdOrTitleResponse, IBySearchResponse } from "./api/types";

interface State {
  searching: boolean;
  fetching: boolean;
  error: Error | null;
  list: IBySearchResponse["Search"];
  total: number;
  detailsById: Record<string, IByIdOrTitleResponse>;
}

const initialState: State = {
  searching: false,
  fetching: false,
  error: null,
  list: [],
  total: 0,
  detailsById: {},
};

export default createReducer(initialState, (builder) => {
  // LIST ACTIONS
  builder.addCase(actions.search.pending, (state) => ({
    ...state,
    error: null,
    searching: true,
  }));
  builder.addCase(actions.search.fulfilled, (state, { payload, meta }) => ({
    ...state,
    error: null,
    searching: false,
    list: meta.arg.page ? [...state.list, ...payload.Search] : payload.Search,
    total: parseInt(payload.totalResults),
  }));
  builder.addCase(actions.search.rejected, (state, { error }) => ({
    ...state,
    searching: false,
    error: error as Error,
    list: [],
    total: 0,
  }));

  // GET BY ID ACTIONS
  builder.addCase(actions.getById.pending, (state) => ({
    ...state,
    error: null,
    fetching: true,
  }));

  builder.addCase(actions.getById.fulfilled, (state, { payload }) => ({
    ...state,
    fetching: false,
    error: null,
    detailsById: {
      ...state.detailsById,
      [payload.imdbID]: payload,
    },
  }));
  builder.addCase(actions.getById.rejected, (state, { error }) => ({
    ...state,
    fetching: false,
    error: error as Error,
  }));
});
