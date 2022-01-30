import { css } from '@emotion/react'
import { Paper, Typography } from "@mui/material";

const primary = '#1976d2';

export function Header() {
  return (
    <Paper elevation={3} css={styles.navBar}>
      <Typography>{'EcoPortal'}</Typography>
    </Paper>
  );
}

const styles = {
  navBar: css({
    background: primary,
    height: 50,
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    borderRadius: 0,
    p: {
      color: 'white',
    },
  }),
};
