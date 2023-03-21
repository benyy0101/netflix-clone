"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import Profile from "../public/images/profile_default.png";
import AccountMenu from "./AccountMenu";

import { BsChevronDown, BsBell, BsSearch } from "react-icons/bs";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuVisible((prev) => !prev);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setAccountMenuVisible((prev) => !prev);
  }, []);
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
        `}
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
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              mobileMenuVisible ? "rotate-180" : ""
            }`}
          />
          <MobileMenu visible={mobileMenuVisible} />
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image src={Profile} alt="profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                accountMenuVisible ? "rotate-180" : ""
              }`}
            />
            <AccountMenu visible={accountMenuVisible} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
