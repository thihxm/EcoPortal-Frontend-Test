import { css } from "@emotion/react";
import { Box, CircularProgress, Container, Dialog, DialogTitle, Fab, Slider, TextField, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { ReviewCard } from "../../components/ReviewCard";
import { reviewsActions, useAppDispatch, useAppSelector, userActions } from "../../redux";
import { ReviewDialog } from "../../components/ReviewDialog";

type ReviewResponse = {
  id: string;
  title: string;
  rating: number;
  body: string;
  userByUserReviewerId: {
    name: string,
  };
}

type ReviewData = {
  title: string;
  rating: number;
  body: string;
};

type HandleSubmitHandler = (data: ReviewData) => void;

type HandleEditHandler = (reviewId: string, data: ReviewData) => void;

export const Movie: NextPage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const reviewsState = useAppSelector((state) => state.reviews);
  const userState = useAppSelector((state) => state.user);

  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [userId, setUserId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [selectedReviewData, setSelectedReviewData] = useState<ReviewData | null>(null);

  const handleCloseAddReviewDialog = () => {
    setOpenReviewDialog(false);
  };

  const handleOpenAddReviewDialog = () => {
    setSelectedReview(null);
    setSelectedReviewData(null);
    setOpenReviewDialog(true);
  };

  const handleEditReview: HandleEditHandler = (reviewId, data) => {
    setSelectedReview(reviewId);
    setSelectedReviewData(data);
    setOpenReviewDialog(true);
  };
  
  const handleSubmit: HandleSubmitHandler = ({ title, rating, body }) => {
    if (selectedReview) {
      dispatch(reviewsActions.updateReview({
        title,
        rating,
        body,
        reviewId: selectedReview,
      }));
    } else {
      dispatch(reviewsActions.createReview({
        title,
        rating,
        body,
        userReviewerId: userId,
        movieId,
      }));
    }
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
                <ReviewCard
                  key={review.id}
                  id={review.id}
                  title={review.title}
                  author={review.userByUserReviewerId.name}
                  rating={review.rating}
                  body={review.body}
                  onEdit={(reviewId) => {
                    handleEditReview(reviewId, {
                      title: review.title,
                      rating: review.rating,
                      body: review.body,
                    })
                  }}
                />
              ))}
          
        </Box>

        <ReviewDialog
          onClose={handleCloseAddReviewDialog}
          isOpen={openReviewDialog}
          onSubmit={(data) => handleSubmit(data)}
          initialData={selectedReviewData}
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
