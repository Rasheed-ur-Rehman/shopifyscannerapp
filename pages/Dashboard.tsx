
import React from 'react';
import { ScanResult, ShopifyIssue } from '../types';
import { ICONS } from '../constants';

interface DashboardProps {
  result: ScanResult;
  onOpenModal: (title: string, description: string, actionLabel?: string, onAction?: () => void) => void;
  onDownload: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ result, onOpenModal, onDownload }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-700 print:max-w-none print:px-0">
      {/* Print Header */}
      <div className="hidden print:block mb-10 border-b-2 border-[#008060] pb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-display font-bold">LeakScanner <span className="text-[#008060]">AI Report</span></h1>
          <div className="text-right text-xs font-bold text-gray-400">
            REF: {Math.random().toString(36).substring(7).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 print:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3 no-print">
            <span className="bg-green-100 text-[#008060] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-green-200">Verified Technical Scan</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-gray-900 tracking-tight print:text-4xl">
            {result.storeName}
          </h2>
          <p className="text-gray-500 mt-4 flex items-center gap-2 text-sm font-medium">
            <span className="text-[#008060]"><ICONS.Check /></span> Analysis completed on {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto no-print">
          <button 
            onClick={onDownload}
            className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 bg-white border border-gray-200 px-8 py-4 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <ICONS.Search /> Print Report (PDF)
          </button>
          <button 
            onClick={() => onOpenModal("Share Result", "Secure link created.", "Copy Link")}
            className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 bg-[#202223] px-8 py-4 rounded-2xl text-sm font-bold text-white hover:bg-black transition-all shadow-xl active:scale-95"
          >
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16 print:grid-cols-2 print:gap-4 print:mb-8">
        <div className="lg:col-span-1 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col justify-between print:shadow-none print:border-2 print:p-6">
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 print:mb-4">Profit Score</h3>
            <div className="flex items-end gap-2">
              <span className={`text-8xl font-display font-bold leading-none print:text-6xl ${result.score > 70 ? 'text-[#008060]' : result.score > 40 ? 'text-orange-500' : 'text-red-500'}`}>
                {result.score}
              </span>
              <span className="text-gray-200 text-2xl font-bold mb-3">/100</span>
            </div>
          </div>
          <div className="mt-12 print:mt-6">
            <div className="w-full bg-gray-50 h-3.5 rounded-full overflow-hidden p-0.5 border border-gray-100">
              <div 
                className={`h-full rounded-full ${result.score > 70 ? 'bg-[#008060]' : result.score > 40 ? 'bg-orange-500' : 'bg-red-500'}`} 
                style={{ width: `${result.score}%` }} 
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#1a1c1d] p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl flex flex-col justify-between relative overflow-hidden print:bg-white print:shadow-none print:border-2 print:p-6">
          <div className="no-print absolute -right-12 -top-12 w-48 h-48 bg-[#008060] opacity-10 rounded-full blur-3xl"></div>
          <div>
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-8 print:text-gray-400 print:mb-4">Monthly Leak Value</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-display font-bold text-white tracking-tighter print:text-gray-900 print:text-5xl">${result.totalLoss.toLocaleString()}</span>
            </div>
            <p className="text-[#008060] font-black text-[10px] mt-4 uppercase tracking-widest">Calculated Risk Index</p>
          </div>
          <div className="no-print mt-12 text-white text-xs font-black uppercase tracking-widest">
            Recovery Roadmap Ready
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-50 p-10 rounded-[2.5rem] flex flex-col justify-between border border-gray-100 relative print:bg-white print:border-2 print:p-6">
           <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 print:mb-4">Executive Diagnosis</h3>
            <p className="text-2xl text-gray-800 leading-snug font-medium print:text-lg">
              "{result.summary}"
            </p>
          </div>
          <div className="mt-12 flex gap-3 flex-wrap print:mt-4">
            <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest shadow-sm">Technical SEO Analyzed</span>
            <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest shadow-sm">Mobile Performance Check</span>
          </div>
        </div>
      </div>

      <div className="space-y-10 print:space-y-6">
        <h3 className="text-3xl font-display font-bold text-gray-900 pb-4 border-b border-gray-100 print:text-2xl print:pb-2">Audit Breakdown</h3>
        
        {result.issues.map((issue, idx) => (
          <div key={issue.id} className="print:break-inside-avoid">
            <div className="bg-white border border-gray-100 rounded-[2rem] p-10 shadow-sm flex flex-col md:flex-row gap-10 relative overflow-hidden print:rounded-xl print:p-6 print:border-2 print:gap-6">
               <div className={`absolute top-0 left-0 w-1.5 h-full ${issue.impact.toLowerCase() === 'high' ? 'bg-red-500' : issue.impact.toLowerCase() === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
               
               <div className="md:w-20 flex-shrink-0 print:w-12">
                 <div className="w-20 h-20 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-2xl font-display font-bold text-gray-200 print:w-12 print:h-12 print:text-lg">
                    {idx + 1}
                 </div>
               </div>

               <div className="flex-grow">
                 <div className="flex flex-wrap items-center gap-4 mb-4 print:mb-2">
                   <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                     issue.impact.toLowerCase() === 'high' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                   }`}>
                     {issue.impact} Impact
                   </span>
                   <span className="text-[9px] font-black px-4 py-1.5 rounded-full bg-gray-100 text-gray-400 uppercase tracking-widest">
                     {issue.category}
                   </span>
                 </div>
                 <h4 className="text-2xl font-display font-bold text-gray-900 mb-4 tracking-tight print:text-xl print:mb-2">{issue.title}</h4>
                 <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-3xl print:text-sm print:mb-4">{issue.description}</p>
                 
                 <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 print:p-3">
                   <div className="p-1.5 bg-[#008060] text-white rounded-full scale-90 print:hidden">
                     <ICONS.Check />
                   </div>
                   <div className="text-sm">
                     <span className="text-gray-400 uppercase font-black text-[9px] block mb-0.5">Solution</span>
                     <span className="text-gray-800 font-medium">{issue.recommendation}</span>
                   </div>
                 </div>
               </div>

               <div className="md:w-56 flex-shrink-0 flex flex-col justify-center items-center bg-gray-50 rounded-[1.5rem] p-8 border border-gray-100 print:w-32 print:p-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Leak Value</span>
                  <span className="text-4xl font-display font-bold text-red-600 print:text-2xl">${issue.estimatedLoss.toLocaleString()}</span>
                  <span className="text-[10px] font-black text-gray-400 mt-2 tracking-widest">/ MONTH</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 relative rounded-[3rem] overflow-hidden bg-[#1a1c1d] p-16 text-center shadow-2xl print:hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h3 className="text-4xl font-display font-bold text-white mb-6">Recover your profits.</h3>
          <p className="text-gray-400 mb-12 text-xl">Fix these leaks today and scale your brand to new heights.</p>
          <button className="bg-[#008060] text-white px-12 py-5 rounded-[1.25rem] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">Start Implementation</button>
        </div>
      </div>

      <div className="hidden print:block mt-10 pt-6 border-t border-gray-100 text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
        CONFIDENTIAL REPORT &copy; LEAKSCANNER AI &bull; SCAN ID: LS-{Date.now()}
      </div>
    </div>
  );
};

export default Dashboard;
