import React, { useState } from 'react';
import { logo, close, menu } from '../assets';
import { navLinks } from '../constants';

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [toggle, setToggle] = useState(false);

  return (
    <header className=" text-white shadow-lg sticky top-0 ">
      <div className="container mx-auto flex items-center h-24 justify-between">
        <a href="/" className="flex items-center">
          <img className="h-44 w-44 ml-4 mt-8" src={logo} alt="logo" />
        </a>
        <nav className=" font-semibold text-base lg:text-lg hidden md:flex">
          <ul className="flex items-center">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? 'text-secondary font-bold' : 'text-black'
                } text-[16px] font-poppins py-2 px-4 mr-2 `}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Menu for small devices */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? 'text-secondary' : 'text-black'
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
