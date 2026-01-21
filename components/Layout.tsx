
import React from 'react';
import { ICONS } from '../constants';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onOpenModal: (title: string, description: string, actionLabel?: string, onAction?: () => void) => void;
  navigateTo: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenModal, navigateTo }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[#008060] selection:text-white bg-[#fcfcfc]">
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigateTo(AppView.LANDING)}>
            <div className="p-1.5 bg-[#008060] rounded-lg group-hover:scale-110 transition-transform">
               <ICONS.Store />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900">
              Leak<span className="text-[#008060]">Scanner</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-10">
            <button 
              onClick={() => navigateTo(AppView.HOW_IT_WORKS)}
              className="text-sm font-bold text-gray-500 hover:text-[#008060] transition-colors"
            >
              How it works
            </button>
            <button 
              onClick={() => navigateTo(AppView.PRICING)}
              className="text-sm font-bold text-gray-500 hover:text-[#008060] transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => onOpenModal("Support", "Need help with a scan? Start a conversation with our AI bot below, or reach out at support@leakscanner.ai.")}
              className="text-sm font-bold text-gray-500 hover:text-[#008060] transition-colors"
            >
              Support
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo(AppView.AUTH)}
              className="text-sm font-bold text-[#008060] hover:text-[#006e52] transition-colors px-3 py-1 hidden sm:block"
            >
              Log in
            </button>
            <button 
              onClick={() => navigateTo(AppView.SIGNUP)}
              className="bg-[#008060] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#006e52] transition-all hover:shadow-lg shadow-green-900/10 active:scale-95"
            >
              Free Scan
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#1a1c1d] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="p-1.5 bg-[#008060] rounded-lg">
                   <ICONS.Store />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight">LeakScanner</span>
              </div>
              <p className="text-gray-400 text-base max-w-sm leading-relaxed">
                Empowering Shopify merchants to reclaim their lost revenue using advanced real-time AI diagnostics.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold mb-8 uppercase text-[10px] tracking-[0.2em] text-gray-500">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400 font-medium">
                <li><button onClick={() => navigateTo(AppView.LANDING)} className="hover:text-[#008060] transition-colors">Scanner</button></li>
                <li><button onClick={() => navigateTo(AppView.HOW_IT_WORKS)} className="hover:text-[#008060] transition-colors">How it Works</button></li>
                <li><button onClick={() => navigateTo(AppView.PRICING)} className="hover:text-[#008060] transition-colors">Pricing</button></li>
                <li><button onClick={() => navigateTo(AppView.AUTH)} className="hover:text-[#008060] transition-colors">Login</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold mb-8 uppercase text-[10px] tracking-[0.2em] text-gray-500">Legal & Support</h4>
              <ul className="space-y-4 text-sm text-gray-400 font-medium">
                <li><button onClick={() => onOpenModal("Privacy", "We do not store your private Shopify data. Scans are processed in real-time and reports are temporarily cached for your convenience.")} className="hover:text-[#008060] transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-[#008060] transition-colors">Terms of Service</button></li>
                <li><button onClick={() => onOpenModal("Contact", "Our average response time is < 2 hours for Pro users. Email: support@leakscanner.ai")} className="hover:text-[#008060] transition-colors">Email Support</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
              &copy; 2024 LeakScanner AI &bull; Not affiliated with Shopify Inc.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#008060] transition-colors cursor-pointer">𝕏</div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#008060] transition-colors cursor-pointer">Li</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
