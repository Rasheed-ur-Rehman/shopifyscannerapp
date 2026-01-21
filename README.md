
# Shopify Revenue Leak Scanner

An AI-powered diagnostic tool for Shopify stores to identify conversion bottlenecks and missed revenue opportunities.

## Features
- **Store Scan Simulation**: Uses Gemini AI to analyze mocked Shopify data and identify leaks.
- **Rules Engine**: Checks for product page gaps, checkout friction, trust signals, and tracking health.
- **Revenue Dashboard**: Visualizes your leak score and monthly profit loss.
- **Actionable Advice**: Provides clear recommendations to fix each issue.

## Tech Stack
- **Frontend**: Next.js (React), TypeScript, Tailwind CSS
- **AI Engine**: Google Gemini API (gemini-3-flash-preview)
- **Deployment**: Vercel

## Local Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env.local` file and add your Google Gemini API Key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```
4. Run the development server: `npm run dev`

## Deployment to Vercel
1. Push your code to a GitHub repository.
2. Link the repository to a new Vercel project.
3. Add the `API_KEY` to the Environment Variables in the Vercel project settings.
4. Deploy!

## Note on Shopify OAuth
In this MVP, the OAuth flow is simulated to demonstrate the UI and AI analysis. To use this in a production environment with real Shopify stores, you would need to implement the standard [Shopify OAuth flow](https://shopify.dev/docs/apps/auth/oauth) and use the `shopify-api-node` or `@shopify/shopify-api` libraries to fetch actual product, order, and analytics data.
