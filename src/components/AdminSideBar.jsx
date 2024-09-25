import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import Button from './Button';
import { useUser } from '../context/UserContaxt';
import { fetchAPI } from '../lib/fetch';

const AdminSidebar = ({ isOpen ,setIsOpen }) => {
  const { removeCrad } = useUser();
  const navigate = useNavigate();
  const logout = async () => {
    navigate('/login');
    await fetchAPI('/users/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    removeCrad();
  };
  return (
    <section
      className={`fixed lg:relative w-[100vw] md:w-64 bg-gray-200/35 h-screen transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform lg:translate-x-0`}
      onClick={()=>setIsOpen(!isOpen)}
    >
      <nav className="w-64 bg-gray-800 h-full flex  items-center flex-col py-4 px-4">
        <NavLink
          to="/admin/tender"
          className={({ isActive }) =>
            ` p-2 w-[200px] text-center transition duration-200 ${
              isActive
                ? 'bg-blue-500 rounded-sm text-white'
                : 'hover:bg-gray-700'
            }`
          }
        >
          <span className="ml-2">Manage Tender </span>
        </NavLink>
        <Button
          className=" mt-5 w-full h-[50px]"
          text="logout"
          onClick={logout}
        />
      </nav>
    </section>
  );
};

export default AdminSidebar;
