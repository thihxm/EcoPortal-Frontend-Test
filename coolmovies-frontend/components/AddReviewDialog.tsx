import { css } from "@emotion/react";
import { Box, Button, Dialog, DialogTitle, IconButton, Slider, TextField, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector, reviewsActions } from "../redux";

interface AddReviewDialogProps {
  onClose: () => void
  isOpen: boolean
  userId: string
  movieId: string
}

export function AddReviewDialog({ 
  onClose,
  isOpen,
  userId,
  movieId
}: AddReviewDialogProps) {
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      title: { value: string };
      rating: { value: number };
      body: { value: string };
    };

    const data = {
      title: target.title.value,
      rating: target.rating.value,
      body: target.body.value,
      movieId,
      userReviewerId: userId,
    }

    dispatch(reviewsActions.createReview(data))
    onClose()
  }

  useEffect(() => {
    dispatch(reviewsActions.clearCreateReview())
  }, [dispatch])

  return (
    <Dialog maxWidth="md" fullWidth onClose={onClose} open={isOpen}>
      <DialogTitle>
        Create review
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Box component="form" onSubmit={handleSubmit} css={styles.dialogContent}>
        <TextField required fullWidth label="Title" variant="outlined" name="title" />

        <Box>
          <Typography color="text.secondary">Rating</Typography>
          
          <Slider
            defaultValue={1}
            step={1}
            aria-label="rating slider"
            valueLabelDisplay="auto"
            marks
            min={1}
            max={5}
            name="rating"
          />
        </Box>

        <TextField required fullWidth label="Body" multiline rows={8} variant="outlined" name="body" />

        <Button type="submit" variant="contained" css={styles.submitButton}>
          Create
        </Button>
      </Box>
    </Dialog>
  );
}

const styles = {
  dialogContent: css`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    flex: 1;

    & > * {
      width: 100%;
    }
  `,
  submitButton: css`
    max-width: 300px;
  `,
}
