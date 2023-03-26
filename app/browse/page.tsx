"use client";
import useCurrentUser from "../../hooks/useCurrentUser";
import Profile from "../../components/Profile";

import Navbar from "../../components/Navbar";
import Billboard from "../../components/Billboard";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";

import axios from "axios";
import useTMDB from "@/hooks/useTMDB";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModel";

const Page = () => {
  // const create = async () =>{
  //   try{
  //     await axios.post("./api/create", DUMMY_DATA)
  //   }
  //   catch (e){
  //     console.log(e)
  //   }
  // }

  const {data:trending = []} = useTMDB();
  const {data:favorites = []} = useFavorites();
  const {isOpen, closeModal} = useInfoModal();

  // console.log("page ", favorites)

  return (
    <div>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={trending} title="Trending Now"/>
        <MovieList data={favorites} title="My List"/>
      </div>
    </div>
  );
};

export default Page;
