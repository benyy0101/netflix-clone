import {NextApiRequest, NextApiResponse} from 'next';
import prismadb from '../../lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse) {
     if (req.method !== 'GET') {
        return res.status(405).end();
     }

     try{
        await serverAuth(req);
         
        const movieCount = await prismadb.movie.count();
        const random = Math.floor(Math.random() * movieCount);

        const movie = await prismadb.movie.findMany({
              take:1,
              skip: random,
        });

      //   console.log("random ",movie);
        
        return res.status(200).json(movie[0]);
     }
     catch (error){
        console.log(error);
        return res.status(400).end();
     }
}
