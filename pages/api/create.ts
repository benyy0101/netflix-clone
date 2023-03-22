import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prismadb from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const movies = req.body;

  const createMovies = await prismadb.movie.createMany({
    data: movies,
  });

  if (createMovies) {
    return res.status(201).json({ createMovies });
  } else {
    return res.status(400).end();
  }
}
