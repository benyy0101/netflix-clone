import axios from "axios";
import React, { useCallback, useMemo } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
interface FavoriteButtonProps {
  movie: Record<string, any>;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoritIds || [];
    return list.includes(movie.id);
  }, [currentUser, movie.id]);

  const toggleFavorite = useCallback(async () => {

    let response;

    if (isFavorite) {
      response = await axios.delete("api/dispatchFavorite", { data: movie.id });
    } 
    else {
      response = await axios.post("api/dispatchFavorite", movie);
    }

    const updatedFavorites = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavorites,
    });
    mutateFavorites();
  }, [movie.id, mutate, mutateFavorites, currentUser, isFavorite]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorite}
      className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300
        "
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
