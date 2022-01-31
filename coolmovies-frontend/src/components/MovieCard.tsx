import { css } from '@emotion/react';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface MovieCardProps {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  userCreator: string;
  href?: string;
}

const MovieCardBase: ForwardRefRenderFunction<HTMLAnchorElement, MovieCardProps> = ({
  title,
  director,
  releaseDate,
  userCreator,
  href,
}, ref) => {
  return (
    <Card css={styles.cardContainer}>
      <CardActionArea href={String(href)} ref={ref} css={styles.cardButton}>
        <CardContent css={styles.cardContent}>
          <Typography variant="h2" css={styles.movieTitle}>
            {title}
          </Typography>
          <div css={styles.detailsContainer}>
            <Typography color="text.secondary">
              {director}
            </Typography>
            <Typography color="text.secondary">
              {Intl.DateTimeFormat(undefined, {
                year: 'numeric'
              }).format(new Date(releaseDate))}
            </Typography>
          </div>
          <Typography color="text.secondary" css={styles.creatorText}>
            Created by: {userCreator}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const styles = {
  cardContainer: css`
    width: 100%;

    @media (min-width: 768px) {
      max-width: 345px;
    }
  `,
  cardButton: css`
    height: 100%;
  `,
  cardContent: css`
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  movieTitle: css`
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.125rem;
  `,
  detailsContainer: css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  `,
  creatorText: css`
    display: block;
    margin-top: auto;
    margin-left: auto;
  `,
}

export const MovieCard = forwardRef(MovieCardBase)