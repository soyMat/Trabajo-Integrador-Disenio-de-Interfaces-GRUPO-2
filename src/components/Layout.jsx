import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-cyan/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-teal/10 blur-3xl -z-10"></div>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-[#1C1C1E] text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm sm:text-base font-light text-gray-300">
          Austral Market® | Tel: 2901585858 | Dirección: Yrigoyen 879 | Gmail: AustralMarket@gmail.com
        </div>
      </footer>
    </div>
  );
};

export default Layout;
