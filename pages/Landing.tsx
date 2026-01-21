
import React, { useState } from 'react';

interface LandingProps {
  onConnect: (url: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onConnect }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onConnect(url);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#f9fafb] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              New: Gemini 3.0 Analysis Engine Integrated. <a href="#" className="font-semibold text-[#008060]"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 sm:text-6xl">
            Where is your store <span className="text-[#008060]">leaking money?</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Stop guessing. Connect your Shopify store and let our AI scanner find hidden revenue leaks in your product pages, checkout flow, and tracking setup in 60 seconds.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                placeholder="mystore.myshopify.com"
                className="flex-grow rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#008060] sm:text-sm sm:leading-6"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-md bg-[#008060] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#006e52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008060] transition-all"
              >
                Start Free Scan
              </button>
            </form>
            <p className="mt-4 text-xs text-gray-500">
              No credit card required. Read-only access to your store data.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-12">
            {[
              {
                title: "Conversion Gaps",
                desc: "Identify specific high-traffic products that aren't selling and understand why.",
                icon: "💰"
              },
              {
                title: "Checkout Friction",
                desc: "Detect broken pixels, hidden shipping costs, and technical errors that kill sales.",
                icon: "🛒"
              },
              {
                title: "Trust Analysis",
                desc: "Our AI scans for missing trust badges, reviews, and social proof that build buyer confidence.",
                icon: "🛡️"
              }
            ].map((feature, idx) => (
              <div key={idx} className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 -z-10 h-full w-full overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#008060] to-[#5c6ac4] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};

export default Landing;
