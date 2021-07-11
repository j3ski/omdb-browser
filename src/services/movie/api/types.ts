type EntityType = "movie" | "series" | "episode";

interface ICommon {
  type?: EntityType;
  y?: number; //year of release
}

interface IByIdOrTitleCommon extends ICommon {
  plot?: "short" | "full";
}

export interface IByIdParams extends IByIdOrTitleCommon {
  i: string;
}

export interface IByTitleParams extends IByIdOrTitleCommon {
  t: string;
}

export interface IBySearchParams extends ICommon {
  s: string;
  page?: number;
}

export interface IByIdOrTitleResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: EntityType;
  DVD: string;
  BoxOffice: `$${string}`;
  Production: string;
  Website: string;
  Response: "True";
}

export interface IBySearchResponse {
  Search: Array<{
    Title: string;
    Year: string;
    imdbID: string;
    Type: EntityType;
    Poster: string;
  }>;
  totalResults: string;
  Response: "True";
}

export interface IErrorResponse {
  Response: "False";
  Error: string;
}
