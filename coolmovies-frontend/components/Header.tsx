import { css } from '@emotion/react'
import { Paper, Typography } from "@mui/material";
import Link from 'next/link';

const primary = '#1976d2';

export function Header() {
  return (
    <Paper elevation={3} css={styles.navBar}>
      <Link href="/" passHref>
        <Typography component="a" css={styles.logo}>{'EcoPortal'}</Typography>
      </Link>
      <ul css={styles.menuItems}>
        <li>
          <Link href="/reviews" passHref>
            <Typography component="a" css={styles.link}>{'Reviews'}</Typography>
          </Link>
        </li>
      </ul>
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
    justifyContent: 'center',
    padding: 16,
    borderRadius: 0,
  }),
  logo: css`
    color: white;
    margin-right: auto;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  `,
  menuItems: css`
    margin-right: auto;
    list-style: none;

    display: flex;
    gap: 1rem;
  `,
  link: css`
    text-decoration: none;
    color: white;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  `,
};
