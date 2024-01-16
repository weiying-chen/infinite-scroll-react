import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = <T>(dataUrl: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('cachedData');
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setError(null);
        } else {
          const result = await axios(dataUrl);

          if (result.status === 200 && Array.isArray(result.data)) {
            setData(result.data);
            setError(null);
            localStorage.setItem('cachedData', JSON.stringify(result.data));
          } else {
            throw new Error(
              'Oops! Something went wrong while trying to fetch the data. Please try again later.',
            );
          }
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred.',
        );
      }
    };

    fetchData();
  }, [dataUrl]);

  return { data, error };
};

export default useFetch;
