
import { GoogleGenAI, Type } from "@google/genai";
import { ScanResult } from "../types";

export async function performStoreScan(shopUrl: string): Promise<ScanResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Perform a live technical revenue leak audit for the website: ${shopUrl}
    
    CRITICAL: You MUST use Google Search to find real details about ${shopUrl}.
    Analyze and report specifically on:
    1. Meta Title: Is it optimized for CTR?
    2. Meta Description: Does it include a strong value prop?
    3. Mobile Optimization: Check for viewport issues or small touch targets.
    4. Performance: Estimate LCP (Largest Contentful Paint) and FCP (First Contentful Paint).
    5. Revenue Leaks: Identify 5 specific high-impact leaks.

    Return the result in this JSON format:
    {
      "score": number (0-100),
      "totalLoss": number (estimated monthly USD),
      "storeName": "Actual Brand Name",
      "summary": "2-3 sentence executive summary",
      "technicalAudit": {
        "metaTitle": "Current Title",
        "metaDescription": "Current Description",
        "mobileOptimization": "Optimization status",
        "lcpScore": "e.g. 2.4s",
        "fcpScore": "e.g. 1.1s"
      },
      "issues": [
        {
          "id": "unique_id",
          "category": "Product|Checkout|UX|Trust|Tracking|SEO|Performance",
          "title": "Clear issue title",
          "description": "Specific finding from ${shopUrl}",
          "impact": "High|Medium|Low",
          "estimatedLoss": number,
          "recommendation": "Exact fix"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      }
    });

    const data = JSON.parse(response.text || '{}');
    return data as ScanResult;
  } catch (error: any) {
    console.error("Scan Error:", error);
    throw new Error("Analysis failed. Please check the URL and your API Key configuration.");
  }
}

export async function getAIChatResponse(message: string, context?: ScanResult | null): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are the LeakScanner Assistant. You are a world-class Shopify optimization expert.
    Context:
    - User's Store: ${context?.storeName || 'Unknown'}
    - Profit Score: ${context?.score || 'N/A'}/100
    - Monthly Loss: $${context?.totalLoss || '0'}
    - SEO Audit: ${context?.technicalAudit?.metaTitle || 'Pending'}
    
    Instructions:
    - Be professional and helpful.
    - If asked "Hi", say "Hello! I'm your LeakScanner assistant. How can I help you optimize ${context?.storeName || 'your store'} today?"
    - Provide specific advice based on the scan results (Performance, SEO, Mobile).
    - If the user asks about an issue like "how do I fix meta titles", explain the process specifically for their store.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having trouble connecting to my AI brain. Please ensure your API Key is valid and try again!";
  }
}
