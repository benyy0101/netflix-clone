"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";

import { BsChevronDown } from "react-icons/bs";

const Navbar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

 const toggleMobileMenu = useCallback(
   () => {
        setMobileMenuVisible((prev) => !prev);
   },[]);
 
  return (
    <nav className="w-full fixed z-40">
      <div
        className="
     px-4
     md:px-16
     py-6
     flex
     flex-row
     items-center
     transition
     duration-500
     bg-zinc-900
     bg-opacity-90
    "
      >
        <Image
          width={100}
          height={50}
          alt="Netflix Logo"
          src="/../public/images/logo.png"
        />

        <div
          className="
        flex-row
        ml-8
        gap-7
        hidden
        lg:flex
        "
        >
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className="text-white transition" />
          <MobileMenu visible = {mobileMenuVisible}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
