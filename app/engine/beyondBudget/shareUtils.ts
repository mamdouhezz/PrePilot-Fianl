import { BudgetReasoning } from '../../types/beyond-budget';

export function formatComprehensiveBudgetShare(reasonings: BudgetReasoning[]): string {
  let content = "💡 وشلون وزعنا ميزانية الحملة؟\n\n";
  
  reasonings.forEach(reasoning => {
    // NOTE: The prompt requested an icon, but this is plain text.
    // A bullet point or emoji is a suitable substitute for text-based sharing.
    // FIX: The icon property is an IconType, replaced with a generic emoji for text-based sharing.
    content += `🔹 ${reasoning.platform}: ${reasoning.percentage.toFixed(1)}% → ${reasoning.explanation}\n`;
  });

  content += "\n— تمت التقديرات باستخدام PrePilot.Cloud\n#PrePilotAI #تسويق_رقمي #استراتيجية";
  return content;
}


export async function copyBudgetToClipboard(content: string): Promise<boolean> {
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

export function shareBudgetToLinkedIn(content: string) {
  const url = `https://www.linkedin.com/sharing/share-offsite/?summary=${encodeURIComponent(content)}`;
  openShareWindow(url);
}

export function shareBudgetToFacebook(content: string) {
  const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(content)}`;
  openShareWindow(url);
}

export function shareBudgetToTwitter(content: string) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
  openShareWindow(url);
}