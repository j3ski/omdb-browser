export const isServer = typeof window === "undefined";

/**
 * Utility function to be used in a page's getInitialProps.
 * Next will call getInitialProps both on the server & front-end.
 * We'd like to block the server version until we get the response from the API
 * But for the FE, we usually want to eagerly redirect the user to the page
 * and show them some loading state (or partial data).
 *
 * @param promise - redux thunk action (or combination of them)
 */
export const waitOnServer = async (promise: Promise<any>) => {
  if (isServer) {
    try {
      await promise;
    } catch (e) {}
  }
};
