
import { GoogleGenAI, Type } from "@google/genai";
import { ScanResult } from "../types";

export async function performStoreScan(shopUrl: string): Promise<ScanResult> {
  const apiKey = process.env.API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey || "" });

  // Detailed prompt for technical audit
  const prompt = `
    Conduct a comprehensive technical and conversion audit for: ${shopUrl}
    
    You MUST research the live site using Google Search. Analyze the following specifically:
    1. SEO: Check Meta Title and Meta Description quality.
    2. PERFORMANCE: Estimate First Contentful Paint and script heavy bottlenecks.
    3. MOBILE: Evaluate layout responsiveness and touch-target spacing.
    4. CONVERSION: Identify specific revenue leaks (missing trust signals, checkout friction).
    
    Return a JSON report including:
    - score: 0-100 (Overall health)
    - totalLoss: Estimated Monthly Revenue Loss in USD.
    - storeName: The actual brand name found on the site.
    - summary: A 2-3 sentence executive summary of findings.
    - issues: Array of 5 technical issues. Each issue MUST include 'category' (Product, Checkout, UX, Trust, Tracking), 'title', 'description', 'impact' (High, Medium, Low), 'estimatedLoss', and 'recommendation'.
    
    Be specific to the content found on ${shopUrl}. If the site is ${shopUrl}, do not provide generic advice.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
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
  } catch (error: any) {
    console.error("AI Scan Error:", error);
    throw new Error("Unable to complete real-time scan. Please verify the URL and try again.");
  }
}

export async function getAIChatResponse(message: string, context?: ScanResult | null): Promise<string> {
  const apiKey = process.env.API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey || "" });

  const systemInstruction = `
    You are the LeakScanner AI Assistant. You help Shopify merchants understand their revenue leaks.
    ${context ? `The user's current store is ${context.storeName} with a Profit Score of ${context.score}/100 and a monthly loss of $${context.totalLoss}.` : ""}
    ${context ? `The main issues found were: ${context.issues.map(i => i.title).join(", ")}.` : ""}
    
    Always be professional, concise, and helpful. If the user says "Hi", reply with a friendly "Hello! I'm your LeakScanner assistant. How can I help you optimize ${context ? context.storeName : "your store"} today?"
    Focus specifically on technical SEO (meta titles/descriptions), mobile layout, and performance.
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
    return response.text || "I'm sorry, I'm having trouble connecting to my brain. Please try again!";
  } catch (error) {
    return "Hello! I'm here to help. It looks like my API connection is busy, but I can tell you that fixing your Meta Descriptions is usually the first step to better SEO!";
  }
}
