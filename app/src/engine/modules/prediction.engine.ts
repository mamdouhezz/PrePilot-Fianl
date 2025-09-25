import { contextualData } from '../../data/contextualData';
import type { PredictionOutput } from '../../types';

/**
 * @file This engine module is responsible for predicting optimal default campaign settings
 * based on the user's selected industry and sub-industry.
 * @author Crafted By Jedar-Agency.com Tech Team
 */

/**
 * Predicts initial campaign settings and contextual questions based on the selected industry.
 * @param {string} industry - The primary industry selected by the user.
 * @param {string} subIndustry - The sub-industry selected by the user.
 * @returns {PredictionOutput} An object containing predicted settings and dynamic questions.
 */
export function predictInitialSettings(
    industry: string,
    subIndustry: string
): PredictionOutput {
    const emptyOutput: PredictionOutput = {
        settings: {},
        questions: [],
    };

    if (!industry) {
        return emptyOutput;
    }

    // Safely access the data
    const industryData = (contextualData as any)[industry];
    if (!industryData) {
        return emptyOutput;
    }
    
    // Try to get context for sub-industry first, then fallback to default
    let context = (industryData as any)[subIndustry] || (industryData as any)['default'];
    if (!context) {
        // If no specific context found, try to get any available context for this industry
        const availableSubIndustries = Object.keys(industryData);
        if (availableSubIndustries.length > 0) {
            context = (industryData as any)[availableSubIndustries[0]];
        }
    }

    if (!context) {
        return emptyOutput;
    }

    // Build the prediction output
    const output: PredictionOutput = {
        settings: {
            platforms: context.defaultPlatforms,
            funnelStage: context.defaultFunnelStage,
        },
        questions: context.keyQuestions || [],
    };

    return output;
}


