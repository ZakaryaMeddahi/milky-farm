import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  console.log('url: ', url);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(url);
        console.log('response: ', response);
        setData(response.data);
      } catch (error) {
        console.log('response error: ', error);
        error.message =
          typeof error.message === 'object' ? error.message[0] : error.message;
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
