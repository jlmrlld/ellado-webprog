import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from '../assets/Traverse_logo-removebg-preview.png';

const links = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Articles', to: '/articles' },
];

const navLinkClasses = ({ isActive }) => 
    [
        'rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
        isActive 
        ? 'bg-[#fcbc2b] text-zinc-900'
        : 'text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900',
    ].join(' ');

const Navbar = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-[#B0C4DE]/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-3">
                    <img src={Logo} alt="Travel Blog Logo" className="h-10 w-auto rounded-md" />
                    <span className="text-xl font-bold text-black">Traverse</span>
                </NavLink>

                <nav className="hidden items-center gap-2 md:flex">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClasses}>
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;