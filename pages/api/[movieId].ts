import { NextApiRequest,NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { AxiosResponse } from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if(req.method !== "GET") {
        res.status(405).end();
    }

    try{
        await serverAuth(req);
        const { movieId } = req.query;

        
        if(typeof movieId !== "string"){
            throw new Error("invalid ID");
        }

        if(!movieId){
            throw new Error("no ID");
        }

        if (movieId.length !== 24){
            const result = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API}&language=en-US`)
            const ObjectId = require('mongodb').ObjectId;
            const movie = {
                id: new ObjectId().toString(),
                title: result.data.title,
                description: result.data.overview,
                videoUrl: "",
                thumbnailUrl: "https://image.tmdb.org/t/p/original"+ result.data.backdrop_path,
                genre: result.data.genres.map((genre: any) => genre.name).join(", "),
                duration: ""+result.data.runtime,
            };

            const new_movie = await prismadb.movie.create({
                data: movie,
            });

            return res.status(200).json(new_movie);

        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        if(!movie){
            throw new Error("no movie");
        }

        return res.status(200).json(movie);

    }
    catch (error){
        console.log(error);
        return res.status(400).end();
    }
}