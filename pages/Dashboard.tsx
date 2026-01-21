
import React from 'react';
import { ScanResult, ShopifyIssue } from '../types';
import { ICONS } from '../constants';

interface DashboardProps {
  result: ScanResult;
  onOpenModal: (title: string, description: string, actionLabel?: string, onAction?: () => void) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ result, onOpenModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 text-[#008060] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Live Analysis</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-gray-900">
            {result.storeName.includes('.') ? result.storeName : result.storeName + '.myshopify.com'}
          </h2>
          <p className="text-gray-500 mt-2 flex items-center gap-2">
            <ICONS.Check /> Report valid for 30 days &bull; {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onOpenModal("Export Report", "Your PDF report is being generated and will be sent to your email shortly.", "Download Now")}
            className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ICONS.Search /> Export PDF
          </button>
          <button 
            onClick={() => onOpenModal("Share Report", "A unique link has been copied to your clipboard. You can share this with your team or agency partners.", "Copy Link")}
            className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Profit Score</h3>
            <div className="flex items-end gap-2">
              <span className={`text-7xl font-display font-bold ${result.score > 70 ? 'text-[#008060]' : result.score > 40 ? 'text-orange-500' : 'text-red-500'}`}>
                {result.score}
              </span>
              <span className="text-gray-300 text-2xl font-medium mb-3">/100</span>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-between text-xs font-bold mb-2">
               <span className="text-gray-400">OPTIMIZATION LEVEL</span>
               <span className={result.score > 70 ? 'text-[#008060]' : 'text-red-500'}>
                {result.score > 70 ? 'HEALTHY' : 'NEEDS ACTION'}
               </span>
            </div>
            <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${result.score > 70 ? 'bg-[#008060]' : result.score > 40 ? 'bg-orange-500' : 'bg-red-500'}`} 
                style={{ width: `${result.score}%` }} 
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#202223] p-8 rounded-3xl border border-gray-100 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#008060] opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Revenue at Risk</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-display font-bold text-white tracking-tight">${result.totalLoss.toLocaleString()}</span>
            </div>
            <p className="text-[#008060] font-bold text-xs mt-2 uppercase tracking-tighter">Potential Monthly Recovery</p>
          </div>
          <button 
            onClick={() => onOpenModal("Recovery Strategy", "Based on your risk, we recommend a 3-stage recovery: 1. Fix Technical Checkout Errors (Immediate), 2. Optimize PDP UX (Weeks 1-2), 3. Re-engage abandoned carts (Week 3).")}
            className="mt-8 text-white text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all underline underline-offset-4 decoration-[#008060]"
          >
            See strategy <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <div className="lg:col-span-2 bg-gray-50 p-8 rounded-3xl flex flex-col justify-between border border-gray-100">
           <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">AI Executive Summary</h3>
            <p className="text-lg text-gray-700 leading-relaxed font-medium italic">
              "{result.summary}"
            </p>
          </div>
          <div className="mt-8 flex gap-3 flex-wrap">
            <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-tighter">UX Optimized</span>
            <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-tighter">Conversion Ready</span>
            <span className="bg-white border border-gray-200 px-3 py-1 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-tighter">Trust Verified</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display font-bold text-gray-900">Found {result.issues.length} Leak Points</h3>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          </div>
        </div>
        
        {result.issues.map((issue, idx) => (
          <div key={issue.id} className="group cursor-pointer" onClick={() => onOpenModal("Fix Implementation", `To resolve "${issue.title}", you need to: ${issue.recommendation}. Our agency partners can handle this setup for you.`, "Hire Expert Fixer")}>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#008060] transition-all flex flex-col md:flex-row gap-8 relative overflow-hidden">
               <div className={`absolute top-0 left-0 w-1 h-full ${issue.impact.toLowerCase() === 'high' ? 'bg-red-500' : issue.impact.toLowerCase() === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
               
               <div className="md:w-16 flex-shrink-0">
                 <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-xl font-display font-bold text-gray-300 group-hover:bg-[#008060] group-hover:text-white transition-colors">
                    0{idx + 1}
                 </div>
               </div>

               <div className="flex-grow">
                 <div className="flex flex-wrap items-center gap-3 mb-3">
                   <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                     issue.impact.toLowerCase() === 'high' ? 'bg-red-50 text-red-600' : 
                     issue.impact.toLowerCase() === 'medium' ? 'bg-orange-50 text-orange-600' : 
                     'bg-blue-50 text-blue-600'
                   }`}>
                     {issue.impact} Impact
                   </span>
                   <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-500 uppercase tracking-widest">
                     {issue.category}
                   </span>
                 </div>
                 <h4 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-[#008060] transition-colors">{issue.title}</h4>
                 <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-2xl">{issue.description}</p>
                 
                 <div className="flex items-center gap-3 text-sm font-bold text-[#008060]">
                   <div className="p-1 bg-[#008060]/10 rounded-full">
                     <ICONS.Check />
                   </div>
                   Fix Recommendation: <span className="text-gray-700 font-medium">{issue.recommendation}</span>
                 </div>
               </div>

               <div className="md:w-48 flex-shrink-0 flex flex-col justify-center items-center bg-gray-50 rounded-2xl p-6 group-hover:bg-[#008060]/5 transition-colors">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Leak Value</span>
                  <span className="text-3xl font-display font-bold text-red-600">${issue.estimatedLoss.toLocaleString()}</span>
                  <span className="text-[10px] font-medium text-gray-400 mt-1">/ MONTH</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 relative rounded-3xl overflow-hidden bg-[#202223] p-12 text-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008060]/20 to-transparent"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-display font-bold text-white mb-4">Recover your lost ${result.totalLoss.toLocaleString()} today.</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Fixing these leaks can increase your net profit by up to 22% without spending an extra dollar on ads. Our experts are ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onOpenModal("Strategy Session", "Our lead optimization expert will review your report with you 1-on-1. Slots are limited.", "Confirm Booking")}
              className="bg-[#008060] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#006e52] hover:scale-105 transition-all shadow-xl shadow-[#008060]/20"
            >
              Book Strategy Session
            </button>
            <button 
              onClick={() => onOpenModal("Partner Program", "We work with top-tier Shopify agencies. We'll introduce you to the best match for your niche.", "Request Intro")}
              className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-10 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Agency Introduction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
