
import React from 'react';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onOpenModal: (title: string, description: string, actionLabel?: string, onAction?: () => void) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenModal }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[#008060] selection:text-white">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="p-1.5 bg-[#008060] rounded-lg group-hover:scale-110 transition-transform">
               <ICONS.Store />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900">
              Leak<span className="text-[#008060]">Scanner</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <button 
              onClick={() => onOpenModal("How it works", "Our engine uses Gemini 3.0 Pro to crawl your Shopify store front-end. It looks for technical errors, missing marketing assets, and checkout bottlenecks that drive customers away.")}
              className="text-sm font-medium text-gray-500 hover:text-[#008060] transition-colors"
            >
              How it works
            </button>
            <button 
              onClick={() => onOpenModal("Pricing", "LeakScanner is currently free for store owners doing under $1M/year. For enterprise brands, we offer a dedicated API for constant monitoring at $299/mo.")}
              className="text-sm font-medium text-gray-500 hover:text-[#008060] transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => onOpenModal("Support", "Need help with your report? Email us at support@leakscanner.ai or use the live chat in the dashboard.")}
              className="text-sm font-medium text-gray-500 hover:text-[#008060] transition-colors"
            >
              Support
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-[#008060] hover:underline hidden sm:block">Log in</button>
            <button 
              onClick={() => onOpenModal("Get Started", "Connect your Shopify store using your .myshopify.com URL to start your first scan immediately.")}
              className="bg-[#008060] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#006e52] transition-all hover:shadow-lg shadow-green-900/10"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-[#008060] rounded-lg">
                   <ICONS.Store />
                </div>
                <span className="font-display font-bold text-xl text-gray-900">LeakScanner</span>
              </div>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                The world's first AI-driven Shopify diagnostics engine. We help merchants recover billions in lost revenue by fixing the simple things that drive buyers away.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Product</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button className="hover:text-[#008060]">AI Scanning</button></li>
                <li><button className="hover:text-[#008060]">Benchmarking</button></li>
                <li><button className="hover:text-[#008060]">Pixel Audit</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button className="hover:text-[#008060]">About Us</button></li>
                <li><button className="hover:text-[#008060]">Privacy</button></li>
                <li><button className="hover:text-[#008060]">Contact</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-xs">
              &copy; 2024 LeakScanner AI. Not affiliated with Shopify Inc.
            </p>
            <div className="flex gap-8">
               <button className="text-gray-400 hover:text-[#008060] transition-colors"><ICONS.Search /></button>
               <button className="text-gray-400 hover:text-[#008060] transition-colors"><ICONS.Check /></button>
               <button className="text-gray-400 hover:text-[#008060] transition-colors"><ICONS.Alert /></button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
