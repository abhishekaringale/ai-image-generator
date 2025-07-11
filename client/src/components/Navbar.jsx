import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { AppContext } from '../context/AppContext.jsx';

function Navbar() {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 xm:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="flex items-center bg-blue-100 gap-2 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer">
              <img src={assets.credit_star} alt="" />
              <p
                onClick={() => navigate('/buy')}
                className="text-xs sm:text-sm font-medium text-gray-600"
              >
                Credits left : 50
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi, sbhi</p>
            <div className="relative group">
              <img
                className="w-10 drop-shadow"
                src={assets.profile_icon}
                alt=""
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="m-0 p-2 bg-white rounded-md border text-sm">
                  <li className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <p onClick={() => navigate('/buy')} className="cursor-pointer">
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 rounded-full sm:px-10 cursor-pointer"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
