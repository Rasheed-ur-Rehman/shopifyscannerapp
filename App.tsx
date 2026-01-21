
import React, { useState } from 'react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Modal from './components/Modal';
import ChatBot from './components/ChatBot';
import { AppView, ScanResult, ModalContent } from './types';
import { performStoreScan } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [storeUrl, setStoreUrl] = useState('');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalContent | null>(null);

  const handleConnect = async (url: string) => {
    setError(null);
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }
    setStoreUrl(normalizedUrl);
    setView(AppView.SCANNING);
    setLoadingStep(0);
    
    const loadingMessages = [
      "Accessing meta tags for " + normalizedUrl + "...",
      "Querying Google Search for technical SEO audit...",
      "Evaluating mobile layout & touch target spacing...",
      "Calculating Performance (LCP/FCP) metrics...",
      "Generating final PDF Profit report..."
    ];

    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 2500);

    try {
      const result = await performStoreScan(normalizedUrl);
      setScanResult(result);
      setTimeout(() => {
        clearInterval(interval);
        setView(AppView.DASHBOARD);
      }, 500);
    } catch (err: any) {
      clearInterval(interval);
      setError("Analysis failed. This usually means the API key is not configured correctly in the environment.");
      setView(AppView.LANDING);
    }
  };

  const openModal = (title: string, description: string, actionLabel?: string, onAction?: () => void) => {
    setActiveModal({ title, description, actionLabel, onAction });
  };

  const navigateTo = (newView: AppView) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <Layout onOpenModal={openModal} navigateTo={navigateTo}>
      <div className="print:bg-white print:block">
        {view === AppView.LANDING && (
          <Landing onConnect={handleConnect} isError={!!error} errorMessage={error || undefined} />
        )}

        {view === AppView.SCANNING && (
          <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white">
            <div className="max-w-md w-full text-center">
              <div className="mb-12 relative flex justify-center">
                <div className="w-24 h-24 border-[12px] border-gray-50 border-t-[#008060] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center font-display font-black text-[#008060] text-xs tracking-tighter">
                  AUDIT
                </div>
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-2 truncate px-10">Scanning {storeUrl}</h2>
              <p className="text-[#008060] font-black h-6 transition-all duration-700 uppercase tracking-widest text-[10px]">{[
                "Crawling Meta Data...",
                "Searching Technical Specs...",
                "Analyzing Mobile Layout...",
                "Measuring Performance...",
                "Ready for Output..."
              ][loadingStep]}</p>
              <div className="mt-10 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden shadow-inner max-w-xs mx-auto">
                <div 
                  className="h-full bg-[#008060] transition-all duration-1000 ease-out" 
                  style={{ width: `${((loadingStep + 1) / 5) * 100}%` }}
                />
              </div>
              <p className="mt-16 text-[8px] text-gray-300 uppercase tracking-[0.5em] font-black">Secure Real-Time AI Processing</p>
            </div>
          </div>
        )}

        {view === AppView.DASHBOARD && scanResult && (
          <Dashboard result={scanResult} onOpenModal={openModal} onDownload={handlePrintPDF} />
        )}

        {view === AppView.PRICING && (
          <div className="py-24 px-4 bg-white animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Start recovering profit.</h2>
              <p className="text-gray-500 mb-16">Stop leaking revenue. Start scaling profit.</p>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="p-10 border border-gray-100 bg-gray-50 rounded-[2.5rem] shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Essential</h3>
                  <div className="text-4xl font-display font-bold mb-8">$0 <span className="text-sm text-gray-400 font-normal">/ month</span></div>
                  <ul className="space-y-4 mb-10 text-sm text-gray-500">
                    <li>✓ 1 Technical Scan / mo</li>
                    <li>✓ SEO Meta Audit</li>
                    <li>✓ Standard PDF Support</li>
                  </ul>
                  <button onClick={() => navigateTo(AppView.SIGNUP)} className="w-full py-4 bg-white border border-gray-200 rounded-2xl font-bold hover:bg-gray-100 transition-colors">Choose Free</button>
                </div>
                <div className="p-10 border-2 border-[#008060] bg-white rounded-[2.5rem] shadow-3xl relative scale-105">
                  <div className="absolute -top-4 right-10 bg-[#008060] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest">MOST POPULAR</div>
                  <h3 className="text-xl font-bold mb-4">Professional</h3>
                  <div className="text-4xl font-display font-bold mb-8">$49 <span className="text-sm text-gray-400 font-normal">/ month</span></div>
                  <ul className="space-y-4 mb-10 text-sm text-gray-500">
                    <li>✓ Unlimited Daily Scans</li>
                    <li>✓ Real-Time Monitoring</li>
                    <li>✓ AI Assistant Access</li>
                    <li>✓ Custom Branded Reports</li>
                  </ul>
                  <button onClick={() => navigateTo(AppView.SIGNUP)} className="w-full py-4 bg-[#008060] text-white rounded-2xl font-bold hover:bg-[#006e52] transition-colors shadow-lg">Start Free Trial</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === AppView.AUTH && (
          <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/20 px-4">
             <div className="w-full max-w-md p-12 bg-white shadow-2xl rounded-[3rem] border border-gray-100">
                <h2 className="text-3xl font-display font-bold text-center mb-8">Sign In</h2>
                <form className="space-y-6" onSubmit={e => { e.preventDefault(); navigateTo(AppView.LANDING); }}>
                  <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#008060] text-sm" />
                  <input type="password" placeholder="Password" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#008060] text-sm" />
                  <button className="w-full py-4 bg-[#008060] text-white font-bold rounded-2xl shadow-xl hover:bg-[#006e52] transition-all transform active:scale-95 mt-4">Login to Dashboard</button>
                  <div className="text-center">
                    <button type="button" onClick={() => navigateTo(AppView.SIGNUP)} className="text-xs font-bold text-gray-400 hover:text-[#008060]">Don't have an account? Sign up</button>
                  </div>
                </form>
             </div>
          </div>
        )}

        {view === AppView.SIGNUP && (
          <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/20 px-4">
             <div className="w-full max-w-md p-12 bg-white shadow-2xl rounded-[3rem] border border-gray-100">
                <h2 className="text-3xl font-display font-bold text-center mb-2">Join LeakScanner</h2>
                <p className="text-center text-gray-500 mb-10 text-sm">Join 5,000+ scaling brands.</p>
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); navigateTo(AppView.LANDING); }}>
                  <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#008060] text-sm" />
                  <input type="email" placeholder="Email" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#008060] text-sm" />
                  <input type="password" placeholder="Create Password" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#008060] text-sm" />
                  <button className="w-full py-4 bg-[#008060] text-white font-bold rounded-2xl shadow-xl mt-6 hover:bg-[#006e52] active:scale-95 transition-all">Create Account</button>
                  <div className="text-center pt-2">
                    <button type="button" onClick={() => navigateTo(AppView.AUTH)} className="text-xs font-bold text-gray-400 hover:text-[#008060]">Already have an account? Sign in</button>
                  </div>
                </form>
             </div>
          </div>
        )}
      </div>

      <Modal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        title={activeModal?.title || ''}
        actionLabel={activeModal?.actionLabel}
        onAction={activeModal?.onAction}
      >
        <p className="text-gray-600 leading-relaxed">{activeModal?.description}</p>
      </Modal>

      <ChatBot scanResult={scanResult} />
      
      <style>{`
        @media print {
          header, footer, button, .chat-widget, .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            font-size: 12pt;
          }
          .max-w-7xl {
            max-width: none !important;
          }
          div, p, h1, h2, h3, h4 {
            color: black !important;
          }
          .text-red-600 {
            color: #dc2626 !important;
          }
          .bg-gray-50 {
            background-color: #f9fafb !important;
          }
          .border {
            border-color: #e5e7eb !important;
          }
          #root {
            display: block !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default App;
