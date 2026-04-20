import { NavLink } from "react-router-dom";
import Logo from '../assets/Traverse_logo-removebg-preview.png';

const links = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Articles', to: '/articles' },
    { name: 'Sign In', to: '/auth/signin' },
];

const navLinkClasses = ({ isActive }) => 
    [
        'rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.24em] transition-all duration-300',
        isActive 
        ? 'bg-[#fcbc2b] text-zinc-900 shadow-md transform scale-105'
        : 'text-zinc-700 hover:bg-white/40 hover:text-zinc-900',
    ].join(' ');

const Navbar = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-[#B0C4DE]/80 backdrop-blur-md border-b border-white/20 shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
                
                <div className="flex items-center gap-3">
                    <img 
                        src={Logo} 
                        alt="Traverse Logo" 
                        className="h-11 w-auto object-contain" 
                    />
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter text-zinc-900 leading-none">
                            TRAVERSE
                        </span>
                        <span className="text-[9px] font-bold tracking-[0.3em] text-zinc-600 uppercase">
                            Travel Blog
                        </span>
                    </div>
                </div>

                <nav className="hidden items-center gap-2 md:flex">
                    {links.map((link) => (
                        <NavLink 
                            key={link.to} 
                            to={link.to} 
                            end={link.to === '/'} 
                            className={navLinkClasses}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;