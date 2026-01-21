
import React, { useState } from 'react';

interface LandingProps {
  onConnect: (url: string) => void;
  isError?: boolean;
  errorMessage?: string;
}

const Landing: React.FC<LandingProps> = ({ onConnect, isError, errorMessage }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onConnect(url.trim());
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#f9fafb] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-10 flex justify-center animate-bounce duration-[3000ms]">
            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-white shadow-sm">
              ✨ Gemini 3.0 Real-Time Scanning Enabled. <button className="font-semibold text-[#008060] ml-1">Learn more <span aria-hidden="true">&rarr;</span></button>
            </div>
          </div>
          <h1 className="text-5xl font-display font-bold tracking-tight text-gray-900 sm:text-7xl">
            Where is your store <br/><span className="text-[#008060] relative">
              leaking money?
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.26C72.6667 2.59333 216.4 -1.74 357 6.26" stroke="#008060" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-gray-600 max-w-xl mx-auto">
            Our AI-powered engine performs a deep audit of your store in real-time. Identify technical bugs, UX gaps, and lost profits in 60 seconds.
          </p>
          
          <div className="mt-12 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <div className="flex-grow relative">
                <input
                  type="text"
                  required
                  placeholder="mystore.myshopify.com"
                  className={`w-full rounded-xl border-0 px-5 py-4 text-gray-900 shadow-xl ring-1 ring-inset ${isError ? 'ring-red-500' : 'ring-gray-200'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#008060] sm:text-sm transition-all`}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#008060] px-8 py-4 text-sm font-bold text-white shadow-xl hover:bg-[#006e52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008060] transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap"
              >
                Start Free Scan
              </button>
            </form>

            {isError && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                {errorMessage}
              </div>
            )}

            <div className="mt-6 flex flex-wrap justify-center items-center gap-6 opacity-60">
               <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Trusted by 500+ merchants</span>
               <div className="flex gap-4">
                  <div className="w-20 h-5 bg-gray-300 rounded opacity-50 grayscale"></div>
                  <div className="w-20 h-5 bg-gray-300 rounded opacity-50 grayscale"></div>
                  <div className="w-20 h-5 bg-gray-300 rounded opacity-50 grayscale"></div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                title: "Real-time Traffic Audit",
                desc: "We scan current site behavior to find where high-intent shoppers are dropping off.",
                icon: "⚡"
              },
              {
                title: "Deep Technical Scan",
                desc: "From pixel misfires to slow theme scripts, we find what's breaking your checkout flow.",
                icon: "🛠️"
              },
              {
                title: "AI Reputation Check",
                desc: "Our model cross-references your store against customer reviews to find trust gaps.",
                icon: "🧠"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="absolute top-0 -z-10 h-full w-full overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#008060] to-[#5c6ac4] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};

export default Landing;
