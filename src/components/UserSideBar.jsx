import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { useUser } from '../context/UserContaxt';
import Button from './Button';

const UserSideBar = ({isOpen , setIsOpen }) => {
  const { removeCrad } = useUser();
  const navigate = useNavigate()
  const logout = async () => {
    navigate('/login');
    removeCrad();
    await fetchAPI('/users/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
   
  };
  return (
    <section className={`fixed lg:relative w-[100vw] md:w-64 h-full bg-gray-200/35  transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0`}
    onClick={() => setIsOpen(!isOpen)}
    >
      <nav className="w-64 bg-gray-800 h-full flex  items-center flex-col py-4 px-4 ">
        <NavLink to="/user/tender" 
        className={({ isActive }) => 
          ` p-2 w-[200px] text-white txransition duration-200 ${isActive ? 'bg-blue-500 rounded-sm text-white' : 'hover:bg-gray-700'}`
        }
        >
          <span className='ml-2'>Available Tender</span>
        </NavLink>
        <NavLink to="/user/managebid" 
        className={({ isActive }) => 
          ` p-2 w-[200px] text-white transition duration-200 ${isActive ? 'bg-blue-500 rounded-sm text-white' : 'hover:bg-gray-700'}`
        }
        >
          <span className='ml-2'>Manage Bids </span>
        </NavLink>
        <Button className=" mt-5 w-full h-[50px]" text="logout" onClick={logout} />
      </nav>
    </section>
  );
};

export default UserSideBar;
