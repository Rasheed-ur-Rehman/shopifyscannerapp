
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Modal from './components/Modal';
import { AppView, ScanResult, ModalContent } from './types';
import { performStoreScan } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [storeUrl, setStoreUrl] = useState('');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalContent | null>(null);

  const loadingMessages = [
    "Initializing crawler for " + storeUrl + "...",
    "Querying Google Search for store reputation...",
    "Analyzing Shopify theme scripts and latency...",
    "Detecting conversion roadblocks in checkout...",
    "Scanning for social proof and trust signals...",
    "AI is simulating user purchase intent...",
    "Finalizing revenue loss report..."
  ];

  const handleConnect = async (url: string) => {
    setError(null);
    setStoreUrl(url);
    setView(AppView.SCANNING);
    setLoadingStep(0);
    
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 2000);

    try {
      const result = await performStoreScan(url);
      setScanResult(result);
      setTimeout(() => {
        clearInterval(interval);
        setView(AppView.DASHBOARD);
      }, 1000);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || "An unexpected error occurred during the scan.");
      setView(AppView.LANDING);
    }
  };

  const openModal = (title: string, description: string, actionLabel?: string, onAction?: () => void) => {
    setActiveModal({ title, description, actionLabel, onAction });
  };

  return (
    <Layout onOpenModal={openModal}>
      {view === AppView.LANDING && (
        <Landing onConnect={handleConnect} isError={!!error} errorMessage={error || undefined} />
      )}

      {view === AppView.SCANNING && (
        <div className="min-h-[70vh] flex items-center justify-center px-4 bg-white">
          <div className="max-w-md w-full text-center">
            <div className="mb-12 relative">
              <div className="w-24 h-24 mx-auto border-4 border-gray-100 border-t-[#008060] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-gray-400">
                {Math.round(((loadingStep + 1) / loadingMessages.length) * 100)}%
              </div>
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Analyzing {storeUrl}</h2>
            <p className="text-[#008060] font-medium h-6">{loadingMessages[loadingStep]}</p>
            <div className="mt-8 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
               <div 
                className="h-full bg-[#008060] transition-all duration-500 ease-out" 
                style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
               />
            </div>
            <p className="mt-8 text-xs text-gray-400 uppercase tracking-widest font-semibold">Real-time data engine active</p>
          </div>
        </div>
      )}

      {view === AppView.DASHBOARD && scanResult && (
        <Dashboard result={scanResult} onOpenModal={openModal} />
      )}

      <Modal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        title={activeModal?.title || ''}
        actionLabel={activeModal?.actionLabel}
        onAction={activeModal?.onAction}
      >
        <p className="text-gray-600 leading-relaxed">{activeModal?.description}</p>
      </Modal>
    </Layout>
  );
};

export default App;
