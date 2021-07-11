import fetch from "isomorphic-unfetch";

import type {
  IByIdOrTitleResponse,
  IByIdParams,
  IBySearchParams,
  IBySearchResponse,
  IByTitleParams,
  IErrorResponse,
} from "./types";
const BASE_URL = "http://www.omdbapi.com/";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

export async function query(params: IByIdParams): Promise<IByIdOrTitleResponse>;
export async function query(
  params: IByTitleParams
): Promise<IByIdOrTitleResponse>;
export async function query(
  params: IBySearchParams
): Promise<IBySearchResponse>;
export async function query(params: any): Promise<any> {
  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({
    apikey: API_KEY,
    ...params,
  }).toString();

  const response = await fetch(url.toString());

  const json: IByIdOrTitleResponse | IBySearchResponse | IErrorResponse =
    await response.json();

  if (json.Response === "False") {
    throw new Error(json.Error);
  }

  return json;
}
