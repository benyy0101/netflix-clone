"use client";
import Image from "next/image";
import Batman from "../public/images/profile_batman.png"
import useCurrentUser from "../hooks/useCurrentUser";

const Profile = () => {
    const {data: user}= useCurrentUser();

  return (
    <div>
      <div
        className="
                w-44
                h-44
                rounded-md
                flex
                items-center
                justify-center
                border-2
                border-transparent
                group-hover:border-white
                group-hover:cursor-pointer
                overflow-hidden
              "
      >
        <Image src={Batman} alt="User profile"></Image>
      </div>

      <div
        className="
                mt-4
                text-gray-400
                text-2xl
                text-center
                group-hover:text-white
                group-hover:cursor-pointer
              "
      >
        {user?.name}
      </div>
    </div>
  );
};

export default Profile;
