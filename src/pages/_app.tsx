import type { AppProps } from "next/app";
import { useMemo } from "react";
import { Provider } from "react-redux";

import { getStore, INITIAL_STATE_KEY } from "../store";

const App = ({
  Component,
  pageProps: { [INITIAL_STATE_KEY]: initialState, ...pageProps },
}: AppProps) => {
  const store = useMemo(() => getStore(initialState), [initialState]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
};

export default App;
