import { KPIExplanation } from '../../types/beyond-kpis';

export function formatComprehensiveShareContent(explanations: KPIExplanation[]): string {
  let content = "📊 رؤى ذكية من خطتي الإعلانية على PrePilot:\n\n";
  explanations.forEach(exp => {
    content += `🔹 ${exp.kpiName} (${exp.kpiValue}): ${exp.explanation}\n\n`;
  });
  content += "تم إنشاؤها بواسطة PrePilot.Cloud - لا تخمن، Just ڤايب ✨\n#PrePilotAI #تسويق_رقمي #استراتيجية";
  return content;
}

export async function copyToClipboard(content: string): Promise<boolean> {
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

export function shareToLinkedIn(content: string) {
  const url = `https://www.linkedin.com/sharing/share-offsite/?summary=${encodeURIComponent(content)}`;
  openShareWindow(url);
}

export function shareToFacebook(content: string) {
  const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(content)}`;
  openShareWindow(url);
}

export function shareToTwitter(content: string) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
  openShareWindow(url);
}
