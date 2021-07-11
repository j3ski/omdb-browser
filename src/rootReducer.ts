import { combineReducers } from "@reduxjs/toolkit";

import { NAME } from "./services/movie/const";
import movieReducer from "./services/movie/reducer";

export default combineReducers({
  [NAME]: movieReducer,
});
