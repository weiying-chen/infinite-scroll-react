import { useState, useEffect, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Repo } from './types';
import RepoList from './components/RepoList'; // Assuming RepoList is adapted for React
import fetchRepos from './api/fetchRepos'; // Assuming this API call works the same way

export default function App() {
  const username = 'tj';
  const perPage = 10;
  const [repos, setRepos] = useState<Repo[]>([]);
  const moreReposRef = useRef(true);

  const getRepos = async () => {
    if (!moreReposRef.current) return;

    try {
      const newRepos = await fetchRepos(username, perPage);
      if (newRepos.length === 0) {
        moreReposRef.current = false;
      }
      setRepos((prevRepos) => [...prevRepos, ...newRepos]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main {...stylex.props(styles.main)}>
      <h1 {...stylex.props(styles.h1)}>{`${username}'s repos`}</h1>
      <RepoList repos={repos} scrollAction={getRepos} />
      <p {...stylex.props(styles.p)}>
        Crafted by{' '}
        <a href="https://github.com/weiying-chen" {...stylex.props(styles.a)}>
          Wei-ying Chen
        </a>
      </p>
    </main>
  );
}

const styles = stylex.create({
  main: {
    fontFamily: "'Nunito', sans-serif",
    width: '100%',
    display: 'flex',
    flexDirection: 'column', // Correctly typed as a FlexDirection
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: '#222',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  p: {
    color: '#666',
  },
  a: {
    color: '#41b480',
    textDecoration: 'none',
  },
  aHover: {
    textDecoration: 'underline',
  },
});
