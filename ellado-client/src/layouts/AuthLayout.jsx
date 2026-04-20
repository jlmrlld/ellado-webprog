import { Outlet } from "react-router-dom";
import Logo from "../assets/Traverse_logo-removebg-preview.png";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-white text-zinc-900 antialiased">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_1.1fr]">
        
        <div className="relative hidden flex-col items-center justify-center bg-[#B0C4DE] lg:flex">
          
          <div className="relative z-10 flex flex-col items-center">
            <img
              src={Logo}
              alt="Traverse Logo"
              className="h-60 w-auto object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
            />

            <div className="mt-6 text-center">
              <h1 className="text-4xl font-black tracking-tighter text-zinc-800">
                TRAVERSE
              </h1>
              <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.4em] text-zinc-600/80">
                Explore the World with Me
              </p>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 right-12 border-t border-zinc-900/10 pt-4">
            <p className="text-xs font-medium text-zinc-700/60">
              Sharing unforgettable journeys, travel tips, and hidden gems from every corner of the globe.
            </p>
          </div>
        </div>

        <main className="flex items-center justify-center bg-white px-8 py-12 sm:px-12 lg:px-20">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;