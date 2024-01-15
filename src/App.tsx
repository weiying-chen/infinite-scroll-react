import { useState, useEffect, CSSProperties } from 'react';
import { Repo } from './types';
import RepoList from './components/RepoList'; // Assuming RepoList is adapted for React
import fetchRepos from './api/fetchRepos'; // Assuming this API call works the same way

const ReposContainer = () => {
  const username = 'tj';
  const perPage = 10;
  const [repos, setRepos] = useState<Repo[]>([]);
  const [noMoreRepos, setNoMoreRepos] = useState(false);

  useEffect(() => {
    getRepos();
  }, []); // Empty dependency array to mimic 'onMounted' in Vue

  const getRepos = async () => {
    if (noMoreRepos) return;

    try {
      const newRepos = await fetchRepos(username, perPage);
      if (newRepos.length === 0) {
        setNoMoreRepos(true);
      }
      setRepos(prevRepos => [...prevRepos, ...newRepos]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>{`${username}'s repos`}</h1>
      {/* Assuming RepoList handles the scroll action internally */}
      <RepoList repos={repos} onScrollAction={getRepos} />
      <p style={styles.p}>
        Crafted by <a href="https://github.com/weiying-chen" style={styles.a}>Wei-ying Chen</a>
      </p>
    </main>
  );
};

const styles: Record<string, CSSProperties> = {
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
};

export default ReposContainer;
