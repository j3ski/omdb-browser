import { createReducer } from "@reduxjs/toolkit";

import * as actions from "./actions";
import { IByIdOrTitleResponse, IBySearchResponse } from "./api/types";

export interface State {
  searching: boolean;
  fetching: boolean;
  error: string | null;
  list: IBySearchResponse["Search"];
  total: number;
  detailsById: Record<string, IByIdOrTitleResponse>;
  lastSearchRequest: string;
}

const initialState: State = {
  searching: false,
  fetching: false,
  error: null,
  list: [],
  total: 0,
  detailsById: {},
  lastSearchRequest: "",
};

export default createReducer(initialState, (builder) => {
  // LIST ACTIONS
  builder.addCase(actions.search.pending, (state, { meta }) => ({
    ...state,
    error: null,
    searching: true,
    lastSearchRequest: meta.requestId,
  }));
  builder.addCase(actions.search.fulfilled, (state, { payload, meta }) => {
    // this is not the request we are waiting for
    if (state.lastSearchRequest !== meta.requestId) {
      return state;
    }
    return {
      ...state,
      error: null,
      searching: false,
      list: meta.arg.page ? [...state.list, ...payload.Search] : payload.Search,
      total: parseInt(payload.totalResults),
    };
  });
  builder.addCase(actions.search.rejected, (state, { error }) => ({
    ...state,
    searching: false,
    error: error.message!,
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
    error: error.message!,
  }));
});
