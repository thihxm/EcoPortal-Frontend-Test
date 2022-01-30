import { css } from "@emotion/react";
import { Box, CircularProgress, Container, Dialog, DialogTitle, Fab, Slider, TextField, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { Review } from "../../components/Review";
import { reviewsActions, useAppDispatch, useAppSelector, userActions } from "../../redux";
import { AddReviewDialog } from "../../components/AddReviewDialog";

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
  const userState = useAppSelector((state) => state.user);

  const [addReviewDialog, setAddReviewDialog] = useState(false);
  const [userId, setUserId] = useState("");
  const [movieId, setMovieId] = useState("");

  const handleCloseAddReviewDialog = () => {
    setAddReviewDialog(false)
  }

  const handleOpenAddReviewDialog = () => {
    setAddReviewDialog(true)
  }
  
  useEffect(() => {
    if (!router.isReady) return;

    const movieId = router.asPath.split('/').at(-1) as string;
    setMovieId(movieId)

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
    if (!userState.fetchUserData) {
      dispatch(userActions.fetchCurrentUser());
    }
  }, [dispatch, router.isReady, router.asPath]);

  useEffect(() => {
    if (userState.fetchUserData && !Array.isArray(userState.fetchUserData)) {
      setUserId(userState.fetchUserData.currentUser.id)
    }
  }, [userState.fetchUserData]);

  useEffect(() => {
    if (!reviewsState.loading && reviewsState.newReviewData && !Array.isArray(reviewsState.newReviewData)) {
      dispatch(reviewsActions.fetchReviewsByMovie(movieId))
    }
  }, [dispatch, movieId, reviewsState.newReviewData, reviewsState.loading]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box css={styles.reviewsContainer}>
          <Typography variant="h1" css={styles.movieTitle}>
            {!Array.isArray(reviewsState.fetchMovieData)
              && reviewsState.fetchMovieData?.movieById.title}
          </Typography>

          {reviewsState.loading
            ? (
              <CircularProgress />
            )
            : !Array.isArray(reviewsState.fetchReviewsData)
                && reviewsState.fetchReviewsData?.allMovieReviews.nodes.map((review: ReviewResponse) => (
                <Review
                  key={review.id}
                  id={review.id}
                  title={review.title}
                  author={review.userByUserReviewerId.name}
                  rating={review.rating}
                  body={review.body}
                />
              ))}
          
        </Box>

        <AddReviewDialog
          onClose={handleCloseAddReviewDialog}
          isOpen={addReviewDialog}
          userId={userId}
          movieId={movieId}
        />

        <Fab onClick={handleOpenAddReviewDialog} color="primary" aria-label="add review" css={styles.addReview}>
          <AddIcon />
        </Fab>
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
  addReview: css`
    position: fixed;
    inset: auto 2rem 2rem auto;
  `,
}

export default Movie
