import React from "react";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import {IoPlaySharp} from "react-icons/io5";
import FavoriteButton from "./favoriteButton";
import {useRouter} from "next/navigation";
import useInfoModal from "@/hooks/useInfoModel";
import {BiChevronDown} from "react-icons/bi";

interface MovieCardProps {
  movie: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  const {openModal} = useInfoModal();


  let backdrop;
  if(movie.backdrop_path === undefined){
    backdrop = movie.thumbnailUrl
  }
  else{
    backdrop = "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
  }
  let runtime;
  if(movie.runtime == undefined){
    runtime = movie.duration
  }
  else{
    runtime = movie.runtime
  }

  const router = useRouter();
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <Image
        className={`
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-md
                group-hover:opacity-90
                sm:group-hover:opacity-0
                delay-300
                w-full
                h-[12vw]
            `}
        src={backdrop}
        alt="movie thumbnail"
        fill
      />
      <div
        className="
      opacity-0
      absolute
      top-0
      transition
      duration-200
      z-10
      invisible
      sm:visible
      delay-300
      w-full
      scale-0
      group-hover:scale-110
      group-hover:-translate-y-[6vw]
      group-hover:translate-x-[2vw]
      group-hover:opacity-100
      "
      >
        <Image
          className={`
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-t-md
                w-full
                h-[12vw]
            `}
          src={backdrop}
          alt="movie thumbnail"
          width={900}
          height={1200}
        />

        <div
          className="
      z-10
      bg-zinc-800
      p-2
      lg:p-4
      absolute
      w-full
      transition
      shadow-md
      rounded-b-md
      "
        >
          <div
            className="
              flex
              flex-row
              items-center
              gap-3

"
          >
            <div
              className="
                cursor-pointer
                w-6
                h-6
                lg:w-10
                lg:h-10
              bg-white
                rounded-full
                flex
                justify-center
                items-center
                transition
              hover:bg-neutral-100
                "
                onClick={() => {
                  return router.push(`/watch/${movie.id}`)
                }}
            >
              <BsFillPlayFill size={30}/>
            </div>
            <FavoriteButton movie={movie}/>
            <div onClick={() => openModal(movie?.id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <BiChevronDown size={30} className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            </div>

            </div>
          </div>
          <div className="flex flex-col space-y-1">
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>

          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {Math.floor(runtime / 60)} hours {runtime % 60} min
            </p>
            
          </div>

          <div className="flex flex-row mt-4 gap-2 items-center">
          <p className="text-white text-[10px] lg:text-sm">
              {movie.genres ? movie.genres.map((genre: any) => genre.name).join(", ") : movie.genre}
            </p>
          </div>
          </div>
        </div>
      </div>
  );
};
export default MovieCard;
