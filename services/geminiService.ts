
import { GoogleGenAI, Type } from "@google/genai";
import { ScanResult, ShopifyIssue } from "../types";

const MOCK_STORE_DATA = {
  products: [
    { name: "Eco-Friendly Yoga Mat", views: 12500, atc: 120, conversions: 45, price: 85 },
    { name: "Stainless Steel Water Bottle", views: 8000, atc: 400, conversions: 350, price: 35 },
    { name: "Organic Cotton T-Shirt", views: 15000, atc: 50, conversions: 10, price: 45 }
  ],
  checkout: {
    abandoned_rate: 0.74,
    average_order_value: 68,
    payment_failures: 12
  },
  theme: {
    speed_score: 42,
    app_count: 32,
    is_mobile_friendly: true
  },
  trust: {
    has_reviews: false,
    has_faq: false,
    shipping_info_clear: false
  },
  tracking: {
    meta_pixel_active: true,
    ga4_configured: true,
    pixel_duplication: true
  }
};

export async function performStoreScan(shopUrl: string): Promise<ScanResult> {
  const apiKey = process.env.API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey || '' });

  const prompt = `
    Analyze this Shopify store data for "${shopUrl}" and identify revenue leaks.
    Data: ${JSON.stringify(MOCK_STORE_DATA)}

    Criteria for leaks:
    1. High views but low Add-to-Cart (ATC) rate.
    2. High ATC but low conversion (checkout abandonment).
    3. UX issues like too many apps (bloat) or slow speed.
    4. Trust gaps: missing reviews, FAQ, or shipping info.
    5. Tracking issues: pixel duplication or misconfiguration.

    Calculate a Revenue Leak Score (0-100, where 100 is perfect and 0 is massive leakage).
    Estimate a Monthly Loss in USD based on traffic patterns and missed conversions.
    Provide top 5 specific actionable issues.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            totalLoss: { type: Type.NUMBER },
            storeName: { type: Type.STRING },
            summary: { type: Type.STRING },
            issues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  category: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  estimatedLoss: { type: Type.NUMBER },
                  recommendation: { type: Type.STRING }
                },
                required: ["id", "category", "title", "description", "impact", "estimatedLoss", "recommendation"]
              }
            }
          },
          required: ["score", "totalLoss", "issues", "storeName", "summary"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as ScanResult;
  } catch (error) {
    console.error("Gemini Scan Error:", error);
    // Fallback mock result if API fails
    return {
      storeName: shopUrl.split('.')[0],
      score: 64,
      totalLoss: 4250,
      summary: "Your store is performing above average but significant revenue is leaking through unoptimized product pages and checkout friction.",
      issues: [
        {
          id: "1",
          category: "Product",
          title: "High Intent, Low Conversion",
          description: "The 'Organic Cotton T-Shirt' has 15k views but only 50 ATCs. This suggests price resistance or poor product photography.",
          impact: "High",
          estimatedLoss: 1200,
          recommendation: "A/B test the product page layout and add social proof."
        }
      ]
    };
  }
}
