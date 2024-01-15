import { useRef, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faCodeBranch,
  faStar,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { Repo } from '../types';

// import useInfiniteScroll from './hooks/useInfiniteScroll'; // Assuming you have a similar hook

interface RepoListProps {
  repos: Repo[];
  onScrollAction: () => void;
}

const RepoList = ({ repos, onScrollAction }: RepoListProps) => {
  const reposEl = useRef(null);

  return (
    <div ref={reposEl} style={styles.repos}>
      {repos.map(repo => (
        <div key={repo.id} style={styles.repo}>
          <h3 style={styles.h3}>
            <a href={repo.html_url} target="_blank" style={styles.a}>
              {repo.name}
            </a>
          </h3>
          <div style={styles.stats}>
            <span style={styles.span}><FontAwesomeIcon icon={faEye} /> {repo.watchers_count}</span>
            <span style={styles.span}><FontAwesomeIcon icon={faCodeBranch} /> {repo.forks_count}</span>
            <span style={styles.span}><FontAwesomeIcon icon={faStar} /> {repo.stargazers_count}</span>
          </div>
        </div>
      ))}
      <FontAwesomeIcon icon={faSpinner} style={styles.spinner} pulse />
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  repos: {
    backgroundColor: '#41b480',
    display: 'flex',
    color: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: '400px',
    maxWidth: '600px',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: 0,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  repo: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 0',
    fontSize: '18px',
    width: '100%',
    textDecoration: 'none',
  },
  h3: {
    margin: '0 0 0 12px',
  },
  a: {
    color: '#fff',
    textDecoration: 'none',
  },
    aHover: { // Style for hover state
    textDecoration: 'underline',
  },
  stats: {
    margin: '0 12px',
  },
  span: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginLeft: '10px',
    opacity: 0.5,
  },
  spinner: {
    fontSize: '30px',
    margin: '6px 0',
  },
};

export default RepoList;

