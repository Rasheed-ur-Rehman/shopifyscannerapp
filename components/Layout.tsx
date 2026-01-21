
import React from 'react';
import { COLORS, ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="p-1.5 bg-[#008060] rounded-lg">
               <ICONS.Store />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900">
              Leak<span className="text-[#008060]">Scanner</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">How it works</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Pricing</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Support</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-[#008060] hover:underline">Log in</button>
            <button className="bg-[#008060] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#006e52] transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gray-200 rounded-lg">
                 <ICONS.Store />
              </div>
              <span className="font-display font-bold text-lg text-gray-900">LeakScanner</span>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; 2024 LeakScanner Inc. Built for Shopify store owners who care about profit.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-gray-500">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-gray-500">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
