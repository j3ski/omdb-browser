import fetch from "isomorphic-unfetch";

import * as api from "../index";

jest.mock("isomorphic-unfetch");

const mockFetch: jest.Mock<typeof fetch> = fetch as any;

describe("movie service", () => {
  describe("api", () => {
    let responseMock = {
      json: jest.fn(() => ({ Response: "True" })),
    };

    beforeEach(() => {
      mockFetch.mockReturnValue(responseMock as any);
    });

    afterEach(() => {
      mockFetch.mockRestore();
    });

    it("should fetch with the proper api key & params", async () => {
      await api.query({ i: "mock id" });

      expect(mockFetch).toBeCalledWith(
        "https://www.omdbapi.com/?apikey=testkey&i=mock+id"
      );
    });

    it("should throw if the response is an error", async () => {
      const errorMessage = "Error";
      mockFetch.mockReturnValue({
        json: jest.fn(() => ({ Response: "False", Error: errorMessage })),
      } as any);

      try {
        await api.query({ i: "mock id" });

        // fail if query doesn't throw
        expect(true).toBeFalsy();
      } catch (e) {
        expect(e.message).toEqual(errorMessage);
      }
    });
  });
});
