import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import { isServer } from "./utils/env";

const _createStore = (state?: any) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: state,
  });

export type Store = ReturnType<typeof _createStore>;
export type State = ReturnType<Store["getState"]>;

// Global store object, will only be set on the Front-End
let globalFEStore: Store;

export const getStore = (state?: State) => {
  const store = globalFEStore || _createStore(state);

  if (!isServer) {
    globalFEStore = globalFEStore || store;
  }

  return store;
};

export const INITIAL_STATE_KEY = "__INITIAL_STATE__";

export const saveInitialState = (store: Store) => ({
  [INITIAL_STATE_KEY]: store.getState(),
});

declare module "react-redux" {
  interface DefaultRootState extends State {}
}
