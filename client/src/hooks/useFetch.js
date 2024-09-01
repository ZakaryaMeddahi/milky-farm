import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const cache = {};

const useFetch = (url, forceUpdate = false) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!forceUpdate && cache[url]) {
      setData(cache[url]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(url);
        setData(response.data);
        cache[url] = response.data;
      } catch (error) {
        error.message =
          typeof error.message === 'object' ? error.message[0] : error.message;
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, forceUpdate]);

  return { data, error, loading };
};

export default useFetch;
