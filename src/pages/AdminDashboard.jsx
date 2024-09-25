import React, { useState } from "react";
import AdminSidebar from "../components/AdminSideBar";
import { useUser } from "../context/UserContaxt";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, removeCrad } = useUser();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
   <div className="flex items-center min-w-full bg-gray-800 justify-between py-2 px-12 ">
        {isOpen ?
         <button
          className="lg:hidden mb-4 text-3xl  text-white p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          x
        </button>  : <button
          className="lg:hidden mb-4 text-3xl  text-white p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰</button>}
        <h1 className='hidden md:block md:text-white text-xl text-nowrap'>
          Tender Managment
        </h1>
        <div className="flex space-x-2">
          <h4 className="mx-6 my-3 text-white self-end text-nowrap">
            Wellcome {user?.name}
          </h4>
         
        </div>
      </div>
    <div className="flex">
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 bg-gray-100">
        
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
