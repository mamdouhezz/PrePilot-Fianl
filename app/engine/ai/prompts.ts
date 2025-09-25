/**
 * AI Prompts Module
 * Contains all prompt-building functions for AI interactions
 */

/**
 * Builds the main orchestrator prompt for AI content generation
 */
export const buildOrchestratorPrompt = (payload: any & { inputs?: any }) => {
  const ctx = payload?.inputs?.contextualAnswers || {};
  const ctxSummary = Object.keys(ctx).length
    ? `\n\nUser's Tech Stack (Critical for Recommendations):\n${Object.entries(ctx).map(([k,v])=>`- ${k}: ${Array.isArray(v) ? v.join(', ') : v || 'N/A'}`).join('\n')}`
    : '';
  return `Generate a detailed marketing report based on the following data: ${JSON.stringify(payload, null, 2)}${ctxSummary}\n\nInstruction: Use the user's tech stack to tailor platform tactics and integrations (e.g., if on 'Salla', mention Salla-TikTok catalog sync).`;
};

/**
 * Builds UI warning prompt for generating user-friendly messages
 */
export const buildUIWarningPrompt = (warnings: any) => 
  `Generate user-friendly messages for these warnings: ${JSON.stringify(warnings)}`;
