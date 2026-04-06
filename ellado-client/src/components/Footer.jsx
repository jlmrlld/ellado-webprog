import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Traverse_logo-removebg-preview.png';

function Footer() {
    return (
        <footer className="mt-auto w-full bg-[#B0C4DE] px-4 py-12 sm:px-6 lg:px-8 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    
                    {/* Branding Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <img 
                                src={logo} 
                                alt="Traverse Logo" 
                                className="h-10 w-auto object-contain" 
                            />
                            <div className="flex flex-col">
                                <span className="text-xl font-black tracking-tighter text-zinc-900 leading-none">
                                    TRAVERSE
                                </span>
                                <span className="text-[8px] font-bold tracking-[0.3em] text-zinc-600 uppercase">
                                    Travel Blog
                                </span>
                            </div>
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-700 max-w-xs">
                            Explore the World with Me. 
                            Sharing unforgettable journeys, travel tips, and hidden gems from every corner of the globe. 
                            Join the adventure!
                        </p>
                    </div>

                    {/* Navigation Section */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-900 mb-8">
                            Quick Links
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/articles" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">Articles</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">About</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Section */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-900 mb-8">
                            Stay Connected
                        </h4>
                        <div className="flex gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/50 border border-zinc-900/10 flex items-center justify-center text-xs font-bold text-zinc-900 hover:bg-[#fcbc2b] hover:border-[#fcbc2b] transition-all cursor-pointer shadow-sm">
                                FB
                            </div>
                            <div className="h-10 w-10 rounded-full bg-white/50 border border-zinc-900/10 flex items-center justify-center text-xs font-bold text-zinc-900 hover:bg-[#fcbc2b] hover:border-[#fcbc2b] transition-all cursor-pointer shadow-sm">
                                IG
                            </div>
                            <div className="h-10 w-10 rounded-full bg-white/50 border border-zinc-900/10 flex items-center justify-center text-xs font-bold text-zinc-900 hover:bg-[#fcbc2b] hover:border-[#fcbc2b] transition-all cursor-pointer shadow-sm">
                                X
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-zinc-900/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        © {new Date().getFullYear()} TRAVERSE BLOG. All Rights Reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest cursor-pointer hover:text-zinc-900">Privacy</span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest cursor-pointer hover:text-zinc-900">Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;