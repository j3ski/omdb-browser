import { createAsyncThunk } from "@reduxjs/toolkit";

import { query } from "./api";

export const search = createAsyncThunk(
  "movie/SEARCH",
  ({ title = "", ...rest }: { title?: string; page?: number }) =>
    query({ s: title, type: "movie", ...rest })
);

export const getById = createAsyncThunk("movie/GET_BY_ID", (id: string) =>
  query({ i: id, type: "movie", plot: "full" })
);
