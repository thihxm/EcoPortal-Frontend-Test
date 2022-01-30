import { css } from "@emotion/react";
import { Box, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { Header } from "../../components/Header";
import { Review } from "../../components/Review";
import { reviewsActions, useAppDispatch, useAppSelector } from "../../redux";

type ReviewResponse = {
  id: string;
  title: string;
  rating: number;
  body: string;
  userByUserReviewerId: {
      name: string,
  };
}

export const Movie: NextPage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const reviewsState = useAppSelector((state) => state.reviews);
  
  useEffect(() => {
    if (!router.isReady) return;

    const movieId = router.asPath.split('/').at(-1) as string;

    dispatch(
      reviewsState.fetchMovieData
        ? reviewsActions.clearMovieData()
        : reviewsActions.fetchReviewsByMovie(movieId)
    );
    dispatch(
      reviewsState.fetchReviewsData
        ? reviewsActions.clearReviewsData()
        : reviewsActions.fetchReviewsByMovie(movieId)
    );
  }, [router.isReady, router.asPath]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box css={styles.reviewsContainer}>
          <Typography variant="h1" css={styles.movieTitle}>
            {!Array.isArray(reviewsState.fetchMovieData)
              && reviewsState.fetchMovieData?.movieById.title}
          </Typography>

          {!Array.isArray(reviewsState.fetchReviewsData)
            && reviewsState.fetchReviewsData?.allMovieReviews.nodes.map((review: ReviewResponse) => (
            <Review
              key={review.id}
              title={review.title}
              author={review.userByUserReviewerId.name}
              rating={review.rating}
              body={review.body}
            />
          ))}
        </Box>
      </Container>
    </>
  );
}

const styles = {
  reviewsContainer: css`
    display: grid;
    gap: 1rem;
    padding: 1rem;
  `,
  movieTitle: css`
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 1rem;
  `,
}

export default Movie
