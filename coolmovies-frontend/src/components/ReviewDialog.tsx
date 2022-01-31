import { css } from "@emotion/react";
import { Box, Button, Dialog, DialogTitle, IconButton, Slider, TextField, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react";

interface ReviewDialogProps {
  onClose: () => void;
  isOpen: boolean;
  initialData?: {
    title: string;
    rating: number;
    body: string;
  } | null;
  onSubmit: (data: {
    title: string;
    rating: number;
    body: string;
  }) => void;
}

export function ReviewDialog({ 
  onClose,
  isOpen,
  initialData,
  onSubmit,
}: ReviewDialogProps) {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(1);
  const [body, setBody] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setRating(initialData.rating);
      setBody(initialData.body);
    }
  }, [initialData])

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
    };

    onSubmit(data);
    handleClose();
  }

  const handleClose = () => {
    setTitle('');
    setRating(1);
    setBody('');

    onClose();
  }

  return (
    <Dialog maxWidth="md" fullWidth onClose={onClose} open={isOpen}>
      <DialogTitle>
        Create review
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
        <TextField
          required
          fullWidth
          label="Title"
          variant="outlined"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <Box>
          <Typography color="text.secondary">Rating</Typography>
          
          <Slider
            defaultValue={initialData ? initialData.rating : 1}
            step={1}
            aria-label="rating slider"
            valueLabelDisplay="auto"
            marks
            min={1}
            max={5}
            name="rating"
            onChange={(event, value) => setRating(value as number)}
          />
        </Box>

        <TextField
          required
          fullWidth
          label="Body"
          multiline
          rows={8}
          variant="outlined"
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />

        <Button type="submit" variant="contained" css={styles.submitButton}>
          {initialData ? 'Update' : 'Create'}
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
