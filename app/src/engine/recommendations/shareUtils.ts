import { TechnicalRecommendation } from '../../types/recommendations';

export function formatComprehensiveRecommendationsShare(recommendations: TechnicalRecommendation[]): string {
    let content = `💡 أهم التوصيات الذكية من خطتي الإعلانية على PrePilot:\n\n`;
    recommendations.slice(0, 3).forEach(rec => {
        content += `🔹 ${rec.title}: ${rec.snippet}\n`;
    });
    content += "\n— تم إنشاؤها بواسطة PrePilot.Cloud\n#PrePilotAI #تسويق_رقمي #استراتيجية";
    return content;
}

export async function copyRecommendationToClipboard(content: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
};


export function shareRecommendationToLinkedIn(content: string) {
  const url = `https://www.linkedin.com/sharing/share-offsite/?summary=${encodeURIComponent(content)}`;
  openShareWindow(url);
}

export function shareRecommendationToTwitter(content: string) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
  openShareWindow(url);
}
