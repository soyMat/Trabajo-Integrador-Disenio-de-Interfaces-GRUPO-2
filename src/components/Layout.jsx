import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Formas suaves de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-surface/20 blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-button/20 blur-3xl -z-10"></div>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-[#1F2430] text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-xs sm:text-base font-light leading-relaxed text-white">
          Austral Market® | Tel: 2901585858 | Dirección: Yrigoyen 879 | Email: AustralMarket@gmail.com
        </div>
      </footer>
    </div>
  );
};

export default Layout;
