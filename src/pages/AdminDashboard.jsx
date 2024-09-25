import React, { useState } from "react";
import AdminSidebar from "../components/AdminSideBar";
import { useUser } from "../context/UserContaxt";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, removeCrad } = useUser();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
   <div className="flex min-w-full h-[70px] bg-gray-800 items-center justify-between py-2 px-2 ">
        {isOpen ?
         <button
          className="lg:hidden  text-3xl  text-white  rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          x
        </button>  : <button
          className="lg:hidden  text-3xl  text-white  rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰</button>}
        <h1 className=' text-white text-xl sm:text-xl text-nowrap'>
          Tender Managment
        </h1>
        <div className="flex space-x-2">
          <h4 className="mx-6 text-white self-end text-nowrap">
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
