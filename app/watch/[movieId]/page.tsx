'use client';
import React from 'react';
import useMovie from '@/hooks/useMovie';
import {useRouter} from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Page: React.FC = ({params}) => {
    const router = useRouter();
    const movieId = params.movieId;
    
    const {data} = useMovie(movieId);

    return(
        <div className='h-screen w-screen bg-black'>
            <nav
            className="
            fixed
            w-full
            p-4
            z-10
            flex
            flex-row
            items-center
            gap-8
            bg-black
            bg-opacity-70"
            >
                <AiOutlineArrowLeft
                onClick={()=>{
                    return router.back();
                }}
                className='text-white
                hover:cursor-pointer'
                size={40}
                />
                <p className='text-white text-1xl md:text-3xl font-bold tracking-wider flex flex-row space-x-2'>
                    <span className='font-light'>
                        Watching: 
                    </span>
                    <div>
                    {data?.title}
                    </div>
                    
                </p>
            </nav>
        </div>
    );
}

export default Page;