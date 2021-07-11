import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useSelector } from "react-redux";

import { getDetailsById } from "../../services/movie/selectors";
import * as S from "./MovieDetails.styled";

const MovieDetails: FC = () => {
  const router = useRouter();

  const details = useSelector((state) =>
    getDetailsById(state, router.query.id as string)
  );

  return (
    <>
      <S.Header>
        <S.BackButton onClick={router.back} />
        <S.Title>{details.Title}</S.Title>
      </S.Header>
      <S.Content>
        <S.Poster>
          {details.Poster !== "N/A" && (
            <Image
              src={details.Poster}
              objectFit="contain"
              layout="fill"
              alt={`${details.Title} poster`}
            />
          )}
        </S.Poster>

        <S.DetailGroup>
          <S.Detail>
            <b>Title:</b> <span>{details.Title}</span>
          </S.Detail>
          <S.Detail>
            <b>Year:</b> <span>{details.Year}</span>
          </S.Detail>
          {details.Genre && (
            <>
              <S.Detail>
                <b>Genre:</b> <span>{details.Genre}</span>
              </S.Detail>
              <S.Detail>
                <b>Awards:</b> <span>{details.Awards}</span>
              </S.Detail>
              <S.Detail>
                <b>Actors:</b> <span>{details.Actors}</span>
              </S.Detail>
              <S.Detail>
                <b>Language:</b> <span>{details.Language}</span>
              </S.Detail>
            </>
          )}
        </S.DetailGroup>

        {details.Plot && <S.Plot>{details.Plot}</S.Plot>}
      </S.Content>
    </>
  );
};

export default MovieDetails;
