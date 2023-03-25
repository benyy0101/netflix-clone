"use client";
import useCurrentUser from "../../hooks/useCurrentUser";
import Profile from "../../components/Profile";

import Navbar from "../../components/Navbar";
import Billboard from "../../components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";

import axios from "axios";
import useTMDB from "@/hooks/useTMDB";

const Page = () => {
  // const create = async () =>{
  //   try{
  //     await axios.post("./api/create", DUMMY_DATA)
  //   }
  //   catch (e){
  //     console.log(e)
  //   }
  // }

  const {data:movies = []} = useMovieList();

  const {data:trending = []} = useTMDB();

  console.log(trending);

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className="pg-40">
        <MovieList data={trending} title="Trending Now"/>
      </div>
    </div>
  );
};

export default Page;
