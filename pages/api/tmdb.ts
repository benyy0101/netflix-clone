import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const api_key = process.env.TMDB_API;
        const movies = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`);
        
        const trends = movies.data.results.slice(undefined,4);
        axios.all(trends.map(item=>axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${api_key}`)))
        .then(
            axios.spread((res1,res2,res3,res4)=>{
                const results = [res1.data,res2.data,res3.data,res4.data];
                return res.status(200).json(results);
            }))
        
    } catch (err) {
        console.log(err);
        return res.status(400).end();
    }
}