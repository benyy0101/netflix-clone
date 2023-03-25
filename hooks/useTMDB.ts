import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useTMDB = () => {
    const {data, error, isLoading} = useSWR('/api/tmdb', fetcher,{
        revalidateOnFocus: false,
        revealIfStale: false,
        revalidateOnReconnect: false,
    })
    
    return {
        data,
        error,
        isLoading
    }
}

export default useTMDB;