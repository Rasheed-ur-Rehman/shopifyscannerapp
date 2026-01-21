
import React from 'react';
import { ScanResult, ShopifyIssue } from '../types';
import { ICONS } from '../constants';

interface DashboardProps {
  result: ScanResult;
}

const Dashboard: React.FC<DashboardProps> = ({ result }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Scan Report: <span className="text-[#008060] capitalize">{result.storeName}</span>
          </h2>
          <p className="text-gray-500 mt-1">Generated on {new Date().toLocaleDateString()} &bull; AI Analysis Completed</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          <ICONS.Search /> Export PDF
        </button>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Revenue Leak Score</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${result.score > 70 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {result.score > 70 ? 'HEALTHY' : 'CRITICAL'}
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-display font-bold text-gray-900">{result.score}</span>
            <span className="text-gray-400 text-xl font-medium mb-1">/ 100</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-6">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${result.score > 70 ? 'bg-green-500' : result.score > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
              style={{ width: `${result.score}%` }} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Estimated Monthly Loss</h3>
            <div className="text-red-500">
              <ICONS.TrendingDown />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-display font-bold text-red-600">${result.totalLoss.toLocaleString()}</span>
            <span className="text-gray-400 text-sm font-medium uppercase tracking-tighter">/ month</span>
          </div>
          <p className="text-gray-500 text-xs mt-4">Based on current traffic and conversion bottlenecks detected.</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Summary Analysis</h3>
            <div className="text-[#008060]">
              <ICONS.Check />
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed italic">
            "{result.summary}"
          </p>
        </div>
      </div>

      {/* Issues Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-display font-bold text-gray-900">Detected Leak Points</h3>
        {result.issues.map((issue, idx) => (
          <IssueCard key={issue.id} issue={issue} index={idx} />
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-[#202223] rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-display font-bold text-white mb-2">Ready to recover your lost revenue?</h3>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Our expert agency partners can fix all identified issues in as little as 48 hours. Start your optimization journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#008060] text-white px-8 py-3 rounded-md font-bold hover:bg-[#006e52] transition-colors">
            Book a Strategy Call
          </button>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors">
            Download Implementation Guide
          </button>
        </div>
      </div>
    </div>
  );
};

const IssueCard: React.FC<{ issue: ShopifyIssue; index: number }> = ({ issue, index }) => {
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-100';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#008060] transition-colors">
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-16 flex-shrink-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-xl font-bold text-gray-400">
            0{index + 1}
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getImpactColor(issue.impact)}`}>
              {issue.impact} IMPACT
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              {issue.category}
            </span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">{issue.title}</h4>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{issue.description}</p>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 text-green-800 font-bold text-sm mb-1">
              <ICONS.Check /> Recommended Action:
            </div>
            <p className="text-sm text-green-700">{issue.recommendation}</p>
          </div>
        </div>
        <div className="md:w-48 flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 p-4 rounded-xl">
           <span className="text-xs text-gray-500 font-medium uppercase mb-1">Estimated Leak</span>
           <span className="text-2xl font-display font-bold text-red-600">${issue.estimatedLoss.toLocaleString()}</span>
           <span className="text-[10px] text-gray-400 mt-1">PER MONTH</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
