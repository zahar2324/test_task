'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/Rooms' },
  { label: 'Create Room', href: '/Create-Rooms' },
  { label: 'Profile', href: '/profile' },
  { label: 'Sign-in', href: '/sign-in' },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full bg-gradient-to-r from-purple-700 via-purple-900 to-indigo-800 shadow-lg sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="text-white text-2xl font-extrabold tracking-wide select-none">
          MeetingBooker
        </div>
        <ul className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`
                    relative
                    text-white 
                    font-semibold 
                    transition-all duration-300 
                    px-3 py-2 
                    rounded-md 
                    hover:text-yellow-300
                    ${isActive ? 'text-yellow-300' : ''}
                  `}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute left-0 bottom-0 w-full h-1 bg-yellow-300 rounded-full animate-gradient-slide"
                    />
                  )}
                </Link>
              </li>
            );
          })}
         
        </ul>
      </nav>

      <style jsx>{`
        @keyframes gradient-slide {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-gradient-slide {
          animation: gradient-slide 0.5s ease forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
