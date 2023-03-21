import Image from "next/image";
import Batman from "../../public/images/profile_batman.png"
import useCurrentUser from "../../hooks/useCurrentUser";

const Page = () => {
    const {data: user}= useCurrentUser();

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is Watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div>
            <div className="group flex-row w-44 mx-auto">
              <div className="
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
              ">
                <Image src={Batman} alt="User profile"></Image>
              </div>

              <div className="
                mt-4
                text-gray-400
                text-2xl
                text-center
                group-hover:text-white
              ">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;