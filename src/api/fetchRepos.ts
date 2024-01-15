import axios from 'axios';
import { Repo } from '../types';

async function fetchRepos(username: string, perPage = 10) {
  try {
    const countResponse = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    const totalCount = countResponse.data.public_repos;
    const totalPages = Math.ceil(totalCount / perPage);
    const randomPage =
      totalPages > 1 ? Math.floor(Math.random() * totalPages) + 1 : 1;

    const repoResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        params: {
          page: randomPage,
          per_page: perPage,
          sort: 'updated',
        },
      },
    );

    const repos: Repo[] = repoResponse.data.map((repo: Repo) => ({
      id: repo.id,
      html_url: repo.html_url,
      name: repo.name,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      stargazers_count: repo.stargazers_count,
    }));

    return repos;
  } catch (err) {
    console.error('Error fetching GitHub repositories:', err);
    return [];
  }
}

export default fetchRepos;
