
import { GoogleGenAI, Type } from "@google/genai";
import { ScanResult } from "../types";

export async function performStoreScan(shopUrl: string): Promise<ScanResult> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Missing API Key. Please configure your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Conduct a real-time revenue leak analysis for the Shopify store at: ${shopUrl}
    
    1. Research this store using Google Search to understand its market position, reputation, and tech stack if possible.
    2. Identify 5 specific areas where they are likely losing money (Revenue Leaks).
    3. Look for checkout friction, missing trust signals (like verified reviews or security badges), or site speed issues mentioned in customer feedback.
    
    Generate a report with:
    - A Leak Score (0-100, 100 being perfect).
    - An Estimated Monthly Revenue Loss (USD).
    - A text summary of findings.
    - 5 Actionable issue objects with title, description, impact (High/Medium/Low), category, and recommendation.
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

    if (!response.text) {
      throw new Error("Empty response from AI engine");
    }

    return JSON.parse(response.text) as ScanResult;
  } catch (error: any) {
    console.error("Gemini Scan Error:", error);
    throw new Error(error.message || "Failed to scan store. Please try again later.");
  }
}
