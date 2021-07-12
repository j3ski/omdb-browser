import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { theme } from "../../../styles/theme";
import MovieSearch from "../MovieSearch";

describe("components", () => {
  describe("MovieSearch", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
      cleanup();
    });

    it("should display a placeholder when no value set", () => {
      render(
        <ThemeProvider theme={theme}>
          <MovieSearch value="" onChange={jest.fn()} debounce={300} />
        </ThemeProvider>
      );

      expect(
        screen.queryByPlaceholderText("Start typing to search...")
      ).toBeInTheDocument();
    });

    it("should not trigger change event handler immediately", () => {
      const changeHandler = jest.fn();
      render(
        <ThemeProvider theme={theme}>
          <MovieSearch value="" onChange={changeHandler} debounce={300} />
        </ThemeProvider>
      );
      const input = screen.queryByPlaceholderText("Start typing to search...");

      fireEvent.change(input, { target: { value: "Search text" } });

      expect(changeHandler).not.toBeCalled();
    });

    it("should trigger change event handler afer timeout", () => {
      const changeHandler = jest.fn();
      const searchTextMock = "Search text";
      render(
        <ThemeProvider theme={theme}>
          <MovieSearch value="" onChange={changeHandler} debounce={300} />
        </ThemeProvider>
      );
      const input = screen.queryByPlaceholderText("Start typing to search...");

      fireEvent.change(input, { target: { value: searchTextMock } });
      jest.runAllTimers();

      expect(changeHandler).toBeCalledWith(searchTextMock);
    });
  });
});
