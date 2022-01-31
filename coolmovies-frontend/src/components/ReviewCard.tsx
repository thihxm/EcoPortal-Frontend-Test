import { css } from "@emotion/react";
import { Box, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { MoreVert as MoreVertIcon, Edit as EditIcon } from "@mui/icons-material";
import React, { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/redux";

interface ReviewCardProps {
  id: string;
  title: string;
  author: string;
  rating: number;
  body: string;
  onEdit?: (reviewId: string) => void;
}

export function ReviewCard({
  id,
  title,
  author,
  rating,
  body,
  onEdit,
}: ReviewCardProps) {
  const dispatch = useAppDispatch();

  const [menuElement, setMenuElement] = useState<Element | null>(null);
  const open = Boolean(menuElement);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuElement(event.currentTarget);
  }

  const handleClose = () => {
    setMenuElement(null);
  }

  const handleEditReview = () => {
    if (onEdit) {
      onEdit(id);
    }
  }

  return (
    <>
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
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'options-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            css={styles.optionsButton}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Typography>
          {body}
        </Typography>
      </Paper>
      <Menu
        anchorEl={menuElement}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEditReview}>
          <EditIcon fontSize="small" css={styles.editIcon} />
          Edit
        </MenuItem>
      </Menu>
    </>
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
  optionsButton: css`
    height: 2rem;
    aspect-ratio: 1 / 1;
  `,
  editIcon: css`
    margin-right: 0.5rem;
  `,
}
