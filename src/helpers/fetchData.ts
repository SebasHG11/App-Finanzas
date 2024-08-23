import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const fetchData = <T>(url: string, refetch: boolean) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<T>(url);
        setData(response.data);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url, refetch]);

  return {
    data,
    error,
    loading
  };
}