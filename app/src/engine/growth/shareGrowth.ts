import { GrowthTactic } from '../../types/growth';

export function formatComprehensiveGrowthShare(tactics: GrowthTactic[]): string {
    let content = `🚀 أهم تكتيكات النمو من خطتي على PrePilot:\n\n`;
    tactics.slice(0, 3).forEach(tactic => {
        content += `🔹 ${tactic.title}: ${tactic.snippet}\n`;
    });
    content += "\n— تم إنشاؤها بواسطة PrePilot.Cloud\n#PrePilotAI #GrowthHacking #تسويق_رقمي";
    return content;
}

export async function copyGrowthTacticToClipboard(content: string): Promise<boolean> {
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

export function shareGrowthTacticToLinkedIn(content: string) {
  const url = `https://www.linkedin.com/sharing/share-offsite/?summary=${encodeURIComponent(content)}`;
  openShareWindow(url);
}

export function shareGrowthTacticToTwitter(content: string) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
  openShareWindow(url);
}
