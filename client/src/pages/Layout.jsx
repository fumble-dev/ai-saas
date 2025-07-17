import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen items-start justify-start">

      <nav className="w-full px-4 min-h-14 flex items-center justify-between border-b border-gray-300">
        <img
          src={assets.logo}
          alt="Logo"
          className="cursor-pointer w-28 sm:w-36"
          onClick={() => navigate("/")}
        />
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        )}
      </nav>

      <div className="flex flex-1 w-full h-[calc(100vh-56px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <main className="flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
