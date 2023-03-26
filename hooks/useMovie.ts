import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useMovie = (id?: string) => {
    console.log(id)
    const {data, error, isLoading} = useSWR(id ? `/api/${id}` : null, fetcher,{
        revalidateOnFocus: false,
        revealIfStale: false,
        revalidateOnReconnect: false,
    })

    return {
        data,
        error,
        isLoading,
    }
}

export default useMovie;