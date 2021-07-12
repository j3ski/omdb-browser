import * as actions from "../actions";
import {
  IByIdOrTitleResponse,
  IBySearchParams,
  IBySearchResponse,
} from "../api/types";
import reducer, { State } from "../reducer";
describe("movie service", () => {
  describe("reducer", () => {
    let stateMock: State;

    beforeEach(() => {
      stateMock = {
        searching: false,
        fetching: false,
        error: null,
        list: [],
        total: 0,
        detailsById: {},
      };
    });

    describe("search", () => {
      let resultMock: IBySearchResponse;
      beforeEach(() => {
        resultMock = {
          totalResults: "10",
          Search: [
            {
              Title: "example",
              Type: "movie",
              Year: "2021",
              imdbID: "id",
              Poster: "posterUrl",
            },
          ],
          Response: "True",
        };
      });

      it("should clear the error & set fetching to true on pending", () => {
        stateMock.error = "to be cleared";

        const endState = reducer(stateMock, actions.search.pending("", null));

        expect(endState).toEqual({
          ...stateMock,
          error: null,
          searching: true,
        });
      });

      it("should set the error & clear results on error", () => {
        stateMock.list = resultMock.Search;
        stateMock.total = 20;
        stateMock.searching = true;
        const errorMock = new Error("Not found");

        const endState = reducer(
          stateMock,
          actions.search.rejected(errorMock, "", {})
        );

        expect(endState).toEqual({
          ...stateMock,
          error: errorMock.message,
          list: [],
          searching: false,
          total: 0,
        });
      });

      it("should save the results to the list on success", () => {
        stateMock.searching = true;

        const endState = reducer(
          stateMock,
          actions.search.fulfilled(resultMock, "", {})
        );

        expect(endState).toEqual({
          ...stateMock,
          searching: false,
          total: 10,
          list: resultMock.Search,
        });
      });

      it("should append to the list if page meta is present", () => {
        stateMock.searching = true;
        stateMock.list = [
          {
            Title: "example2",
            Type: "movie",
            Year: "2022",
            imdbID: "id2",
            Poster: "posterUrl2",
          },
        ];

        const endState = reducer(
          stateMock,
          actions.search.fulfilled(resultMock, "", { page: 1 })
        );

        expect(endState).toEqual({
          ...stateMock,
          searching: false,
          total: 10,
          list: [...stateMock.list, ...resultMock.Search],
        });
      });
    });

    describe("byId", () => {
      let responseMock: IByIdOrTitleResponse;

      beforeEach(() => {
        responseMock = {
          Title: "Mock title",
          Plot: "Mock plot",
          imdbID: "Id",
        } as any;
      });

      it("should clear the error & set loading state on pending", () => {
        stateMock.error = "clear me";

        const endState = reducer(stateMock, actions.getById.pending("", null));

        expect(endState).toEqual({
          ...stateMock,
          fetching: true,
          error: null,
        });
      });

      it("should set the error on error", () => {
        stateMock.fetching = true;
        const errorMock = new Error("Incorrect id");

        const endState = reducer(
          stateMock,
          actions.getById.rejected(errorMock, "", "")
        );

        expect(endState).toEqual({
          ...stateMock,
          fetching: false,
          error: errorMock.message,
        });
      });

      it("should save the details on success", () => {
        stateMock.fetching = true;

        const endState = reducer(
          stateMock,
          actions.getById.fulfilled(responseMock, "", "")
        );

        expect(endState).toEqual({
          ...stateMock,
          fetching: false,
          detailsById: {
            [responseMock.imdbID]: responseMock,
          },
        });
      });
    });
  });
});
