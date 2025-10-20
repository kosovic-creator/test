/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

interface UseFetchReturn<T> {
    data: T | null;
    loading: boolean;
    greska: string | null;
}

export default function useFetch<T = unknown>(url: string): UseFetchReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [greska, setGreska] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Network error");
                const json = (await response.json()) as T;
                setData(json);
            } catch (err: any) {
                setGreska(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, loading, greska };
}
// function App() {
//   const { data, loading, error } = useFetch("https://api.example.com/data");

//   if (loading) return <p>Učitavanje...</p>;
//   if (error) return <p>Greška: {error}</p>;

//   return <div>{JSON.stringify(data)}</div>;
// }
