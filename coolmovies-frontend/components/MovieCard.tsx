import { css } from '@emotion/react';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface MovieCardProps {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  userCreator: string;
}

export function MovieCard({
  title,
  director,
  releaseDate,
  userCreator,
}: MovieCardProps) {
  return (
    <Card css={styles.cardContainer}>
      <CardActionArea css={styles.cardButton}>
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

    @media (min-width: 576) {
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

/* 
{
	"data": {
		"allMovies": {
			"nodes": [
				{
					"id": "70351289-8756-4101-bf9a-37fc8c7a82cd",
					"title": "Rogue One: A Star Wars Story",
					"movieDirectorByMovieDirectorId": {
						"age": 46,
						"id": "c103cc08-ed39-4a3c-a1f3-0f431c07539e",
						"name": "Gareth Edwards"
					},
					"userByUserCreatorId": {
						"id": "7b4c31df-04b3-452f-a9ee-e9f8836013cc",
						"name": "Marle"
					},
					"releaseDate": "2016-12-16"
				},
				{
					"id": "b8d93229-e02a-4060-9370-3e073ada86c3",
					"title": "Star Wars: A New Hope",
					"movieDirectorByMovieDirectorId": {
						"age": 100,
						"id": "7467db60-d506-4f1a-b5b4-7f2620d61669",
						"name": "George Lucas"
					},
					"userByUserCreatorId": {
						"id": "5f1e6707-7c3a-4acd-b11f-fd96096abd5a",
						"name": "Chrono"
					},
					"releaseDate": "1977-05-25"
				}
			]
		}
	}
}
*/