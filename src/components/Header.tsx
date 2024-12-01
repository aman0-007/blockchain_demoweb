import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link as LinkIcon } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Single Block' },
    { path: '/chain', label: 'Blockchain' },
    { path: '/network', label: 'Network' },
    { path: '/toolkit', label: 'Crypto Toolkit' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 mb-4 md:mb-0">
            <LinkIcon className="w-8 h-8" />
            <span className="text-xl font-bold">BlockLearn</span>
          </Link>
          <ul className="flex space-x-6">
            {links.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`relative px-2 py-1 text-sm font-medium transition-colors
                    ${location.pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {label}
                  {location.pathname === path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 h-0.5 bg-blue-600 bottom-0"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};