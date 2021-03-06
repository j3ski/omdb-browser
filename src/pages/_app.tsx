import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import AppLayout from "../components/AppLayout";
import { getStore, INITIAL_STATE_KEY } from "../store";
import GlobalStyles from "../styles/globals";
import { theme } from "../styles/theme";

const App = ({
  Component,
  pageProps: { [INITIAL_STATE_KEY]: initialState, ...pageProps },
}: AppProps) => {
  const store = useMemo(() => getStore(initialState), [initialState]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1,user-scalable=no"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
