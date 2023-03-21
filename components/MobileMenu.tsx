'use client';

import React from 'react';
import NavbarItem from './NavbarItem';

interface MobileMenuProps {
    visible: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({visible}) => {
    if (visible){
        return (
            <div className='bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex'>
            <div className='flex flex-col gap-4'>
                <div className='px-3 text-center text-white hover:underline transition'>
                    Home
                </div>
                <div className='px-3 text-center text-white hover:underline transition'>
                    Series
                </div>
                <div className='px-3 text-center text-white hover:underline transition'>
                    Films
                </div>
                <div className='px-3 text-center text-white hover:underline transition'>
                    New & Popular
                </div>
                <div className='px-3 text-center text-white hover:underline transition'>
                    My List
                </div>
                <div className='px-3 text-center text-white hover:underline transition'>
                    Browse by Languages
                </div>
            </div>
        </div>
        )
    }
    else{
        return null;
    }
    
}

export default MobileMenu;