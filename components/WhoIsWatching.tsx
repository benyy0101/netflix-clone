"use client";
import Profile from "./Profile";
import useCurrentUser from "../hooks/useCurrentUser";

const WhoIsWatching = () => {

    const {data: user} = useCurrentUser();

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is Watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div>
            <div className="group flex-row w-44 mx-auto">
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoIsWatching;
