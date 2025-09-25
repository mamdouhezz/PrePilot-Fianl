import { GoogleGenAI } from "@google/genai";

// Ensure the API key is provided, otherwise throw a configuration error.
if (!process.env.API_KEY) {
  throw new Error("Missing GEMINI_API_KEY. Please set it in your environment variables.");
}

/**
 * The single, shared instance of the GoogleGenAI client for the entire application.
 */
export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
