import { BudgetReasoning } from './generateReasoning';

/**
 * Shares budget allocation content to LinkedIn
 * @param content - Content to share
 * @param url - Optional URL to include
 */
export function shareBudgetToLinkedIn(content: string, url?: string): void {
  const encodedContent = encodeURIComponent(content);
  const linkedInUrl = url 
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodedContent}`
    : `https://www.linkedin.com/sharing/share-offsite/?text=${encodedContent}`;
  
  // Open in new window
  window.open(linkedInUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
}

/**
 * Shares budget allocation content to Facebook
 * @param content - Content to share
 * @param url - Optional URL to include
 */
export function shareBudgetToFacebook(content: string, url?: string): void {
  const encodedContent = encodeURIComponent(content);
  const facebookUrl = url 
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodedContent}`
    : `https://www.facebook.com/sharer/sharer.php?quote=${encodedContent}`;
  
  // Open in new window
  window.open(facebookUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
}

/**
 * Shares budget allocation content to Twitter
 * @param content - Content to share
 * @param url - Optional URL to include
 */
export function shareBudgetToTwitter(content: string, url?: string): void {
  // Twitter has character limit, so we'll truncate if needed
  let twitterContent = content;
  if (twitterContent.length > 200) {
    twitterContent = twitterContent.substring(0, 197) + '...';
  }
  
  const encodedContent = encodeURIComponent(twitterContent);
  const twitterUrl = url 
    ? `https://twitter.com/intent/tweet?text=${encodedContent}&url=${encodeURIComponent(url)}`
    : `https://twitter.com/intent/tweet?text=${encodedContent}`;
  
  // Open in new window
  window.open(twitterUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
}

/**
 * Copies budget allocation content to clipboard
 * @param content - Content to copy
 * @returns Promise<boolean> - Success status
 */
export async function copyBudgetToClipboard(content: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error('Failed to copy budget allocation to clipboard:', error);
    return false;
  }
}

/**
 * Downloads budget allocation as a text file
 * @param content - Content to download
 * @param filename - Optional filename
 */
export function downloadBudgetAsText(content: string, filename: string = 'budget-allocation.txt'): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * Generates a shareable infographic URL (placeholder for future implementation)
 * @param reasonings - Array of budget reasoning objects
 * @returns Promise<string> - Image URL or placeholder
 */
export async function generateBudgetInfographic(reasonings: BudgetReasoning[]): Promise<string> {
  // This is a placeholder for future implementation
  // In a real implementation, you might use Canvas API or a service like Puppeteer
  // to generate an infographic with the budget allocation data
  
  console.log('Generating budget infographic for:', reasonings);
  
  // Return a placeholder URL for now
  return 'https://via.placeholder.com/800x600/1e40af/ffffff?text=Budget+Allocation+Analysis';
}

/**
 * Gets social media platform information for budget sharing
 * @returns Array of platform info objects
 */
export function getBudgetSocialPlatforms() {
  return [
    {
      name: 'LinkedIn',
      icon: '💼',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: shareBudgetToLinkedIn
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-700 hover:bg-blue-800',
      action: shareBudgetToFacebook
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-blue-400 hover:bg-blue-500',
      action: shareBudgetToTwitter
    }
  ];
}

/**
 * Formats content for different social platforms (budget-specific)
 * @param content - Original content
 * @param platform - Target platform
 * @returns Platform-specific formatted content
 */
export function formatBudgetContentForPlatform(content: string, platform: 'linkedin' | 'facebook' | 'twitter'): string {
  switch (platform) {
    case 'twitter':
      // Twitter has 280 character limit
      if (content.length > 280) {
        return content.substring(0, 277) + '...';
      }
      return content;
    
    case 'linkedin':
      // LinkedIn allows longer posts, but we'll keep it concise
      if (content.length > 700) {
        return content.substring(0, 697) + '...';
      }
      return content;
    
    case 'facebook':
      // Facebook allows very long posts
      return content;
    
    default:
      return content;
  }
}

/**
 * Creates a budget allocation summary for sharing
 * @param reasonings - Array of budget reasoning objects
 * @param campaignName - Optional campaign name
 * @returns Formatted summary content
 */
export function createBudgetSummary(reasonings: BudgetReasoning[], campaignName?: string): string {
  const totalBudget = reasonings.reduce((sum, r) => sum + r.budget, 0);
  const topPlatform = reasonings[0]; // Already sorted by percentage
  
  let summary = `📊 تحليل توزيع الميزانية${campaignName ? ` - ${campaignName}` : ''}\n\n`;
  summary += `💰 الميزانية الإجمالية: ${totalBudget.toLocaleString()} ريال\n`;
  summary += `🏆 أكبر تخصيص: ${topPlatform.platform} (${topPlatform.percentage.toFixed(1)}%)\n\n`;
  
  reasonings.slice(0, 3).forEach((reasoning, index) => {
    summary += `${index + 1}. ${reasoning.platform}: ${reasoning.percentage.toFixed(1)}%\n`;
  });
  
  if (reasonings.length > 3) {
    summary += `... و${reasonings.length - 3} منصات أخرى\n`;
  }
  
  summary += `\n— تمت التقديرات باستخدام PrePilot AI`;
  
  return summary;
}

/**
 * Validates budget allocation data before sharing
 * @param reasonings - Array of budget reasoning objects
 * @returns Validation result with errors if any
 */
export function validateBudgetData(reasonings: BudgetReasoning[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!reasonings || reasonings.length === 0) {
    errors.push('لا توجد بيانات توزيع ميزانية للعرض');
  }
  
  const totalPercentage = reasonings.reduce((sum, r) => sum + r.percentage, 0);
  if (Math.abs(totalPercentage - 100) > 0.1) {
    errors.push(`نسبة التوزيع غير متطابقة: ${totalPercentage.toFixed(1)}% بدلاً من 100%`);
  }
  
  reasonings.forEach((reasoning, index) => {
    if (!reasoning.platform || !reasoning.explanation) {
      errors.push(`بيانات منصة ${index + 1} غير مكتملة`);
    }
    
    if (reasoning.percentage < 0 || reasoning.percentage > 100) {
      errors.push(`نسبة ${reasoning.platform} غير صحيحة: ${reasoning.percentage}%`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}