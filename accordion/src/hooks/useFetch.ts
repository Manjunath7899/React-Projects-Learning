import { useEffect, useState } from "react";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T>(url: string): UseFetchState<T> => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await fetch(url);
      const result: T = await response.json();
      setState({ data: result, loading: false, error: null });
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return state;
};
