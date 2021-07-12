import { cleanup, render, screen } from "@testing-library/react";
import { NextRouter, useRouter } from "next/router";
import { DefaultRootState, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import { IByIdOrTitleResponse } from "../../../services/movie/api/types";
import { getDetailsById } from "../../../services/movie/selectors";
import { theme } from "../../../styles/theme";
import MovieDetails from "../MovieDetails";

jest.mock("react-redux");
jest.mock("next/router");
jest.mock("../../../services/movie/selectors");

const useSelectorMock: jest.Mock<typeof useSelector> = useSelector as any;
const useRouterMock: jest.Mock<typeof useRouter> = useRouter as any;
const getDetailsByIdMock: jest.Mock<typeof getDetailsById> =
  getDetailsById as any;

describe("containers", () => {
  describe("MovieDetails", () => {
    let stateMock: DefaultRootState;
    let routerMock: NextRouter;
    let detailsMock: IByIdOrTitleResponse;

    beforeEach(() => {
      stateMock = {} as any;
      routerMock = {
        query: {
          id: "movieId",
        },
      } as any;
      detailsMock = {
        Title: "Fake title",
        Poster: "https://images.example.com/poster_url",
      } as any;
      useSelectorMock.mockImplementation((callback) => callback(stateMock));
      useRouterMock.mockReturnValue(routerMock as any);
      getDetailsByIdMock.mockReturnValue(detailsMock as any);
    });

    afterEach(() => {
      cleanup();
    });

    it("should display the poster image", () => {
      render(
        <ThemeProvider theme={theme}>
          <MovieDetails />
        </ThemeProvider>
      );

      expect(screen.getByAltText("Fake title poster")).toBeInTheDocument();
    });

    it("should not display the poster image if the url is N/A", () => {
      getDetailsByIdMock.mockReturnValue({
        Poster: "N/A",
        Title: "Fake title poster",
      } as any);

      render(
        <ThemeProvider theme={theme}>
          <MovieDetails />
        </ThemeProvider>
      );

      expect(
        screen.queryByAltText("Fake title poster")
      ).not.toBeInTheDocument();
    });
  });
});
