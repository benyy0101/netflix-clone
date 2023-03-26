import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "../../lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { read } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log(req.method,
    req.body);

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req);
      const ObjectId = require("mongodb").ObjectId;

      const {
        id,
        title,
        backdrop_path: thumbnailUrl,
        genres,
        runtime: duration,
        overview: description,
      } = req.body;

      const new_id = new ObjectId(id).toString();

        const existingMovie = await prismadb.movie.findUnique({
          where: {
            id: new_id,
          },
        });

        if (!existingMovie) {
          const final_genres = genres.map((genre: any) => genre.name).join(", ");
        const movie = await prismadb.movie.create({
          data: {
            id: new_id,
            title,
            description,
            duration: "" + duration,
            thumbnailUrl:"https://image.tmdb.org/t/p/w500"+thumbnailUrl,
            videoUrl: "",
            genre: final_genres,
          },
        });
        }

      if (new_id) {
        const user = await prismadb.user.update({
          where: {
            email: currentUser.email || "",
          },
          data: {
            favoritIds: {
              push: new_id.toString(),
            },
          },
        });

        return res.status(200).json(user);
      } else {
        const user = await prismadb.user.update({
          where: {
            email: currentUser.email || "",
          },
          data: {
            favoritIds: {
              push: id,
            },
          },
        });

        return res.status(200).json(user);
      }
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req);
      
      const movieId = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId
        },
      });

      if (!existingMovie) {
        throw new Error("Movie not found");
      }

      const updatedFavorites = without(currentUser.favoritIds, movieId);

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoritIds: updatedFavorites,
        },
      });

      return res.status(200).json(user);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
