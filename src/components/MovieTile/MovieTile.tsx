import Image from "next/image";
import { FC } from "react";

import { IBySearchResponse } from "../../services/movie/api/types";
import * as S from "./MovieTile.styled";
interface Props {
  movie: IBySearchResponse["Search"][0];
}

const MovieTile: FC<Props> = ({ movie }) => (
  <S.TileWrapper>
    <S.Poster>
      {movie.Poster !== "N/A" && (
        <Image
          src={movie.Poster}
          layout="fill"
          alt={`${movie.Title} poster`}
          objectFit="contain"
        />
      )}
    </S.Poster>
    <S.Title title={movie.Title}>{movie.Title}</S.Title>
  </S.TileWrapper>
);

export default MovieTile;
