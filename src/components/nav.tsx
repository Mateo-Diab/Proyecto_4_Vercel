"use client";

import { navConfig } from "@/config/navConfig";
import { NavItem } from "@/interfaces/INavItem";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import Private from "./Private";
import CartStatus from "./CartStatus";
import { useState } from "react";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      <button
        className="md:hidden block text-3xl text-white p-3 rounded-lg hover:bg-gray-800 transition-colors"
        onClick={toggleMenu}
      >
        ☰
      </button>

      <ul
        className={`md:flex p-4 py-2 justify-around items-center bg-gray-700 md:block ${
          isMenuOpen ? "block p-6 space-y-4" : "hidden"
        } transition-all duration-300`}
      >
        {navConfig.map((el: NavItem) => {
          return !el.isPrivate ? (
            <li key={el.path} className="group md:mr-8">
              <Link href={`/${el.path}`}>
                <span className="text-white text-lg font-bold group-hover:text-blue-300 transition-colors">
                  {el.text}
                </span>
              </Link>
            </li>
          ) : (
            <Private key={el.path}>
              <li className="group md:mr-8">
                <Link href={`/${el.path}`}>
                  <span className="text-white text-lg font-bold group-hover:text-blue-300 transition-colors">
                    {el.text}
                  </span>
                </Link>
              </li>
            </Private>
          );
        })}
        <div className="flex items-center gap-8 md:ml-4">
          <li className="md:mr-8">
            <UserAvatar />
          </li>
          <li>
            <CartStatus />
          </li>
        </div>
      </ul>
    </div>
  );
}
