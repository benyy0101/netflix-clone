"use client";
import useCurrentUser from "../../hooks/useCurrentUser";
import Profile from "../../components/Profile";

import Navbar from "../../components/Navbar";
import Billboard from "../../components/Billboard";
import MovieList from "@/components/MovieList";

import axios from "axios";

const Page = () => {
  // const create = async () =>{
  //   try{
  //     await axios.post("./api/create", DUMMY_DATA)
  //   }
  //   catch (e){
  //     console.log(e)
  //   }
  // }

  return (
    <div>
      <Navbar />
      <Billboard />
      <div>
        <MovieList />
      </div>
    </div>
  );
};

export default Page;
