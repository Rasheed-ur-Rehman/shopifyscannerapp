
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-700 print:max-w-none print:px-0 print:py-0">
      {/* Print-Only Header */}
      <div className="hidden print:flex flex-col mb-10 border-b-4 border-[#008060] pb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-display font-bold text-gray-900">LeakScanner <span className="text-[#008060]">AI Audit</span></h1>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-400">REPORT ID: LS-{Date.now().toString().slice(-6)}</p>
            <p className="text-sm text-gray-500 font-medium">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
           <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Entity Audited</p>
           <p className="text-2xl font-display font-bold text-gray-900">{result.storeName}</p>
        </div>
      </div>

      {/* Main UI Header */}
      <div className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 print:mb-8 no-print">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-100 text-[#008060] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-green-200">Full Tech Audit Verified</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-gray-900 tracking-tight">
            {result.storeName}
          </h2>
          <p className="text-gray-500 mt-4 flex items-center gap-2 text-sm font-medium">
            <span className="text-[#008060]"><ICONS.Check /></span> Real-time scan successful &bull; {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button 
            onClick={onDownload}
            className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 bg-white border border-gray-200 px-8 py-4 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF Report
          </button>
          <button 
            onClick={() => onOpenModal("Share Result", "Secure dashboard link created.", "Copy Link")}
            className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 bg-[#202223] px-8 py-4 rounded-2xl text-sm font-bold text-white hover:bg-black transition-all shadow-xl active:scale-95"
          >
            Share
          </button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16 print:grid-cols-2 print:gap-4 print:mb-12">
        <div className="lg:col-span-1 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col justify-between print:shadow-none print:border-2 print:p-8">
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

        <div className="lg:col-span-1 bg-[#1a1c1d] p-10 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden print:bg-white print:border-2 print:p-8">
          <div>
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-8 print:text-gray-400 print:mb-4">Revenue Leak</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-display font-bold text-white tracking-tighter print:text-gray-900 print:text-5xl">${result.totalLoss.toLocaleString()}</span>
            </div>
            <p className="text-[#008060] font-black text-[10px] mt-4 uppercase tracking-widest">Est. Monthly Loss</p>
          </div>
          <div className="mt-12 no-print">
             <span className="bg-[#008060]/20 text-[#008060] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Strategy Ready</span>
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 flex flex-col justify-between print:bg-white print:border-2 print:p-8">
           <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 print:mb-4">Executive Diagnosis</h3>
            <p className="text-2xl text-gray-800 leading-snug font-medium print:text-lg">
              "{result.summary}"
            </p>
          </div>
          <div className="mt-12 flex gap-3 flex-wrap print:hidden">
             <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">Meta Audit Complete</span>
             <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">Performance Audited</span>
          </div>
        </div>
      </div>

      {/* Technical Audit Section */}
      <div className="mb-16 print:break-inside-avoid print:mb-12">
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100 flex items-center gap-3">
          Technical Architecture Audit
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm print:p-0 print:border-0">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">SEO Metadata</h4>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-[#008060] uppercase mb-1 tracking-widest">Meta Title</p>
                <p className="text-sm font-bold text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-100">{result.technicalAudit.metaTitle}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-[#008060] uppercase mb-1 tracking-widest">Meta Description</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">{result.technicalAudit.metaDescription}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm print:p-0 print:border-0">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Core Web Vitals</h4>
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">LCP</p>
                 <p className="text-2xl font-display font-bold text-gray-900">{result.technicalAudit.lcpScore}</p>
               </div>
               <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">FCP</p>
                 <p className="text-2xl font-display font-bold text-gray-900">{result.technicalAudit.fcpScore}</p>
               </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-[#008060] uppercase mb-1 tracking-widest">Mobile Optimization</p>
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
                <p className="text-sm font-bold text-gray-800">{result.technicalAudit.mobileOptimization}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Breakdown */}
      <div className="space-y-10 print:space-y-6">
        <h3 className="text-2xl font-display font-bold text-gray-900 pb-4 border-b border-gray-100">Revenue Leak Breakdown</h3>
        {result.issues.map((issue, idx) => (
          <div key={issue.id} className="print:break-inside-avoid">
            <div className="bg-white border border-gray-100 rounded-[2rem] p-10 shadow-sm flex flex-col md:flex-row gap-10 relative overflow-hidden print:rounded-2xl print:p-8 print:border-2">
               <div className={`absolute top-0 left-0 w-1.5 h-full ${issue.impact === 'High' ? 'bg-red-500' : issue.impact === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
               <div className="md:w-16 flex-shrink-0 print:w-12">
                 <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-xl font-display font-bold text-gray-300 print:w-12 print:h-12 print:text-lg">
                    {idx + 1}
                 </div>
               </div>
               <div className="flex-grow">
                 <div className="flex flex-wrap items-center gap-4 mb-4">
                   <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                     issue.impact === 'High' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-100 text-gray-500'
                   }`}>
                     {issue.impact} Impact
                   </span>
                   <span className="text-[9px] font-black px-4 py-1.5 rounded-full bg-gray-100 text-gray-400 border border-gray-200 uppercase tracking-widest">
                     {issue.category}
                   </span>
                 </div>
                 <h4 className="text-2xl font-display font-bold text-gray-900 mb-4 tracking-tight print:text-xl print:mb-2">{issue.title}</h4>
                 <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-3xl print:text-sm print:mb-4">{issue.description}</p>
                 <div className="flex items-center gap-4 bg-[#008060]/5 p-5 rounded-2xl border border-[#008060]/10 print:p-4">
                   <div className="text-sm">
                     <span className="text-[#008060] uppercase font-black text-[9px] block mb-0.5 tracking-[0.2em]">Solution Roadmap</span>
                     <span className="text-gray-800 font-bold">{issue.recommendation}</span>
                   </div>
                 </div>
               </div>
               <div className="md:w-52 flex-shrink-0 flex flex-col justify-center items-center bg-gray-50 rounded-[2rem] p-8 border border-gray-100 print:w-36 print:p-6 print:rounded-2xl">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Loss</span>
                  <span className="text-4xl font-display font-bold text-red-600 print:text-2xl">${issue.estimatedLoss.toLocaleString()}</span>
                  <span className="text-[10px] font-black text-gray-400 mt-2 tracking-widest">/ MONTH</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Print Footer */}
      <div className="hidden print:block mt-16 pt-8 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Confidential Report generated by LeakScanner AI v3.0</p>
      </div>

      {/* CTA Box */}
      <div className="mt-24 no-print relative rounded-[3rem] overflow-hidden bg-[#1a1c1d] p-16 text-center shadow-3xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#008060]/20 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h3 className="text-4xl font-display font-bold text-white mb-6">Recover your lost profit today.</h3>
          <p className="text-gray-400 mb-12 text-xl">Join 5,000+ merchants who fixed their leaks using our AI Roadmap.</p>
          <button className="bg-[#008060] text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#008060]/20">Start Implementation</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
