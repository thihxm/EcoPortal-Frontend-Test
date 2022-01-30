import { css } from "@emotion/react";
import { Box, Paper, Typography } from "@mui/material";

interface ReviewProps {
  title: string;
  author: string;
  rating: number;
  body: string;
}

export function Review({ title, author, rating, body }: ReviewProps) {
  return (
    <Paper elevation={1} css={styles.reviewContainer}>
      <Box css={styles.reviewHeader}>
        <Box css={styles.reviewDetails}>
          <Typography variant="h2" css={styles.reviewTitle}>
              {title}
          </Typography>
          <Typography color="text.secondary" css={styles.reviewAuthor}>
              {author}
          </Typography>
        </Box>
        <Typography css={styles.reviewRating}>
            <span>{rating}</span>/5
        </Typography>
      </Box>
      <Typography>
        {body}
      </Typography>
    </Paper>
  );
}

const styles = {
  reviewContainer: css`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    border-radius: 0.5rem;
  `,
  reviewHeader: css`
    display: flex;
    gap: 0.5rem;
  `,
  reviewDetails: css`
    flex-grow: 1;
  `,
  reviewTitle: css`
    font-size: 2rem;
    font-weight: 500;
  `,
  reviewAuthor: css`
    font-size: 0.925rem;
  `,
  reviewRating: css`
    span {
      font-weight: 500;
      font-size: 1.7rem;
    }
  `,
}
