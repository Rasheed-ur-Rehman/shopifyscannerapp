
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { AppView, ScanResult } from './types';
import { performStoreScan } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [storeUrl, setStoreUrl] = useState('');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Connecting to Shopify API...",
    "Fetching product conversion data...",
    "Analyzing theme performance & scripts...",
    "Scanning for missing trust signals...",
    "Checking pixel health...",
    "AI is calculating revenue leakage...",
    "Finalizing diagnostic report..."
  ];

  const handleConnect = async (url: string) => {
    setStoreUrl(url);
    setView(AppView.SCANNING);
    
    // Start simulation of loading steps
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 1500);

    try {
      const result = await performStoreScan(url);
      setScanResult(result);
      // Ensure we see the last step for a bit
      setTimeout(() => {
        clearInterval(interval);
        setView(AppView.DASHBOARD);
      }, 2000);
    } catch (error) {
      console.error("Scan failed", error);
      clearInterval(interval);
      // Fallback
      setView(AppView.LANDING);
    }
  };

  return (
    <Layout>
      {view === AppView.LANDING && (
        <Landing onConnect={handleConnect} />
      )}

      {view === AppView.SCANNING && (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 border-4 border-[#008060] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Analyzing {storeUrl}</h2>
            <p className="text-gray-600 transition-all duration-500">{loadingMessages[loadingStep]}</p>
            <div className="mt-8 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
               <div 
                className="h-full bg-[#008060] transition-all duration-1000" 
                style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
               />
            </div>
          </div>
        </div>
      )}

      {view === AppView.DASHBOARD && scanResult && (
        <Dashboard result={scanResult} />
      )}
    </Layout>
  );
};

export default App;
