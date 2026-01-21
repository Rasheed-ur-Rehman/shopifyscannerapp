
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
      "Connecting to live data engine for " + normalizedUrl + "...",
      "Analyzing technical metadata (SEO & Tags)...",
      "Auditing mobile layout responsiveness...",
      "Simulating high-intent traffic behavior...",
      "Finalizing revenue loss calculations..."
    ];

    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 2000);

    try {
      const result = await performStoreScan(normalizedUrl);
      setScanResult(result);
      setTimeout(() => {
        clearInterval(interval);
        setView(AppView.DASHBOARD);
      }, 500);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || "The site analysis failed. Please ensure the store is live and public.");
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
      <div className="print:bg-white">
        {view === AppView.LANDING && (
          <Landing onConnect={handleConnect} isError={!!error} errorMessage={error || undefined} />
        )}

        {view === AppView.SCANNING && (
          <div className="min-h-[70vh] flex items-center justify-center px-4 bg-white">
            <div className="max-w-md w-full text-center">
              <div className="mb-12 relative flex justify-center">
                <div className="w-24 h-24 border-8 border-gray-100 border-t-[#008060] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-[#008060] text-sm tracking-tighter">
                  SCANNING
                </div>
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2 truncate">Analyzing {storeUrl}</h2>
              <p className="text-[#008060] font-bold h-6 transition-all duration-500">{[
                "Analyzing Meta Title/Desc...",
                "Checking LCP Metrics...",
                "Evaluating Mobile DOM...",
                "Calculating Risk Index...",
                "Generating PDF Report..."
              ][loadingStep]}</p>
              <div className="mt-8 w-full bg-gray-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-[#008060] transition-all duration-700 ease-out" 
                  style={{ width: `${((loadingStep + 1) / 5) * 100}%` }}
                />
              </div>
              <p className="mt-12 text-[9px] text-gray-400 uppercase tracking-[0.3em] font-black">AI Diagnosis Engine v3.0 Active</p>
            </div>
          </div>
        )}

        {view === AppView.DASHBOARD && scanResult && (
          <Dashboard result={scanResult} onOpenModal={openModal} onDownload={handlePrintPDF} />
        )}

        {view === AppView.PRICING && (
          <div className="py-24 px-4 bg-white animate-in fade-in duration-500">
            {/* Pricing UI code here - kept identical but within Layout */}
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Plans for growth</h2>
              <p className="text-gray-500 mb-16">Stop leaking revenue. Start scaling profit.</p>
              {/* Existing pricing grid... */}
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="p-10 border border-gray-100 bg-gray-50 rounded-3xl">
                  <h3 className="text-xl font-bold mb-4">Essential</h3>
                  <div className="text-4xl font-bold mb-8">$0</div>
                  <button onClick={() => navigateTo(AppView.SIGNUP)} className="w-full py-3 bg-white border border-gray-200 rounded-xl font-bold">Get Started</button>
                </div>
                <div className="p-10 border-2 border-[#008060] bg-white rounded-3xl shadow-xl">
                  <h3 className="text-xl font-bold mb-4">Professional</h3>
                  <div className="text-4xl font-bold mb-8">$49</div>
                  <button onClick={() => navigateTo(AppView.SIGNUP)} className="w-full py-3 bg-[#008060] text-white rounded-xl font-bold">Start Trial</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === AppView.AUTH && (
          <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/20">
             <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-3xl border border-gray-100">
                <h2 className="text-3xl font-display font-bold text-center mb-8">Sign In</h2>
                <form className="space-y-6" onSubmit={e => { e.preventDefault(); navigateTo(AppView.LANDING); }}>
                  <input type="email" placeholder="Email" className="w-full px-5 py-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#008060]" />
                  <input type="password" placeholder="Password" className="w-full px-5 py-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#008060]" />
                  <button className="w-full py-4 bg-[#008060] text-white font-bold rounded-xl shadow-lg">Login</button>
                </form>
             </div>
          </div>
        )}

        {view === AppView.SIGNUP && (
          <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/20">
             <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-3xl border border-gray-100">
                <h2 className="text-3xl font-display font-bold text-center mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-8">Join 5,000+ merchants.</p>
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); navigateTo(AppView.LANDING); }}>
                  <input type="text" placeholder="Name" className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#008060]" />
                  <input type="email" placeholder="Email" className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#008060]" />
                  <input type="password" placeholder="Password" className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#008060]" />
                  <button className="w-full py-4 bg-[#008060] text-white font-bold rounded-xl shadow-lg mt-4">Start Scaling</button>
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
          }
          .print-full {
            width: 100% !important;
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
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
