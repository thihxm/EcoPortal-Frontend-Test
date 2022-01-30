import React from 'react';
import { useEffect } from "react";
import { css } from "@emotion/react";
import { NextPage } from "next";
import Link from 'next/link';

import { Header } from "../../components/Header";
import { MovieCard } from "../../components/MovieCard";
import { moviesActions, useAppDispatch, useAppSelector } from "../../redux";

type MovieResponse = {
  id: string;
  title: string;
  movieDirectorByMovieDirectorId: {
      name: string,
  };
  userByUserCreatorId: {
    name: string,
  };
  releaseDate: string;
}

const Reviews: NextPage = () => {
  const dispatch = useAppDispatch();
  const moviesState = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(
      moviesState.fetchData
        ? moviesActions.clearData()
        : moviesActions.fetch()
    );
  }, []);
  
  return (
    <>
      <Header />
      <div css={styles.moviesListContainer}>
        {moviesState.fetchData?.allMovies.nodes.map((movie: MovieResponse) => (
          <Link key={movie.id} href={`/reviews/${movie.id}`} passHref>
            <MovieCard
              id={movie.id}
              title={movie.title}
              director={movie.movieDirectorByMovieDirectorId.name}
              releaseDate={movie.releaseDate}
              userCreator={movie.userByUserCreatorId.name}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

const styles = {
  moviesListContainer: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 32px;
    
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: center;
    }
  `,
}

export default Reviews