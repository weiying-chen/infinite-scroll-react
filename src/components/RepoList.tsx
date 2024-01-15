import { useRef } from 'react';
import * as stylex from "@stylexjs/stylex";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faCodeBranch,
  faStar,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import { Repo } from '../types';
import useInfiniteScroll from 'beautiful-react-hooks/useInfiniteScroll';

interface RepoListProps {
  repos: Repo[];
  scrollAction: () => void;
}

export default function RepoList ({ repos, scrollAction }: RepoListProps) {
  const reposEl = useRef(null);
  const onInfiniteScroll = useInfiniteScroll(reposEl);

  onInfiniteScroll(() => {
    scrollAction()
  })

  return (
    <div ref={reposEl} {...stylex.props(styles.repos)}>
      {repos.map(repo => (
        <div key={repo.id} {...stylex.props(styles.repo)}>
          <h3 {...stylex.props(styles.h3)}>
            <a href={repo.html_url} target="_blank" {...stylex.props(styles.a)}>
              {repo.name}
            </a>
          </h3>
          <div {...stylex.props(styles.stats)}>
            <span {...stylex.props(styles.span)}><FontAwesomeIcon icon={faEye} /> {repo.watchers_count}</span>
            <span {...stylex.props(styles.span)}><FontAwesomeIcon icon={faCodeBranch} /> {repo.forks_count}</span>
            <span {...stylex.props(styles.span)}><FontAwesomeIcon icon={faStar} /> {repo.stargazers_count}</span>
          </div>
        </div>
      ))}
      <FontAwesomeIcon icon={faSpinner} {...stylex.props(styles.spinner)} pulse />
    </div>
  );
};

const styles = stylex.create({
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
  aHover: {
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
});
