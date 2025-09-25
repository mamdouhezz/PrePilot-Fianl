# PrePilot Export Center & Publishing Hub Documentation

## Overview

The PrePilot Export Center & Publishing Hub is a comprehensive system for exporting campaign reports and publishing them across various platforms. It provides multiple access points, smart export options, and AI-powered social media publishing capabilities.

## Architecture

### Core Components

1. **ExportCenter** (`app/components/export/ExportCenter.tsx`)
   - Main hub component with tabs for exports and publishing
   - Integrates ExportQueue and PublishingHub
   - Manages state and routing between different sections

2. **ExportQueue** (`app/components/export/ExportQueue.tsx`)
   - Manages export tasks and queue
   - Provides bulk export capabilities
   - Shows export progress and status

3. **PublishingHub** (`app/components/export/PublishingHub.tsx`)
   - AI-powered social media content generation
   - Draft management and scheduling
   - Platform-specific optimizations

4. **ExportToolbar** (`app/components/export/ExportToolbar.tsx`)
   - Context-aware export buttons for individual sections
   - Dropdown menu with format options
   - Section-specific export capabilities

### State Management

- **Export Store** (`app/stores/exportStore.ts`)
  - Zustand-based state management
  - Persistent storage with localStorage
  - Export history and analytics

- **Export History Hook** (`app/hooks/useExportHistory.ts`)
  - Custom hook for managing export operations
  - LocalStorage integration
  - CRUD operations for exports and reports

### Utilities

- **Export Utils** (`app/utils/exportUtils.ts`)
  - File generation helpers
  - Format validation
  - Progress estimation

- **Share Utils** (`app/utils/shareUtils.ts`)
  - Social media content generation
  - Platform-specific optimizations
  - Web Share API integration

## Access Points

### 1. Toolbar Access
- **Location**: Top toolbar with cloud upload icon
- **Icon**: `FiUploadCloud`
- **Tooltip**: "Export Center & Publishing Hub"
- **Action**: Opens Export Center modal or navigates to dedicated page

### 2. Sidebar Navigation
- **Location**: Left sidebar under "Export & Share" section
- **Items**: 
  - Export Center (`FiUploadCloud`)
  - Publishing Hub (`FiShare2`)
- **Styling**: Special gradient background for emphasis

### 3. Contextual Section Buttons
- **Location**: Individual report sections
- **Components**: StrategicSummary, KPISnippets, MediaPlan, etc.
- **Features**: Section-specific export options
- **Integration**: Uses ExportToolbar component

### 4. Footer CTA
- **Location**: Bottom of Results page
- **Component**: ExportCenterFooter
- **Features**: 
  - Feature showcase
  - Statistics display
  - Quick action buttons
  - Gradient design with animations

## Export Formats

### Supported Formats

1. **PDF** (`pdf`)
   - Full report with styling and watermark
   - Available for: strategic-summary, media-plan, beyond-kpis, beyond-budget, growth-funnel, advanced-recommendations, full-report

2. **PNG** (`png`)
   - High-quality images with transparent background
   - Available for: strategic-summary, kpi-snippets, growth-funnel

3. **Excel** (`xls`)
   - Formatted tables with conditional formatting
   - Available for: media-plan

4. **JSON** (`json`)
   - Raw data export
   - Available for: all sections

5. **Social Media** (`linkedin`, `facebook`, `twitter`)
   - AI-optimized posts
   - Available for: strategic-summary, kpi-snippets, media-plan, beyond-kpis, beyond-budget, growth-funnel, advanced-recommendations

### Format-Specific Features

#### PDF Export
- Material-inspired styling
- PrePilot watermark
- Timestamp inclusion
- Multi-page support
- Arabic text support

#### PNG Export
- HTML-to-image conversion
- Transparent background
- Branded watermark
- High DPI support

#### Excel Export
- Conditional formatting
- Auto-sizing columns
- Formula support
- Multiple sheets

#### Social Media Export
- AI-generated content
- Platform-specific optimization
- Hashtag suggestions
- Engagement scoring

## Social Media Publishing

### AI Content Generation

The system uses AI to generate optimized content for different platforms:

#### LinkedIn
- Professional tone
- Business-focused content
- 3,000 character limit
- Up to 5 hashtags

#### Facebook
- Engaging tone
- Visual emphasis
- 63,206 character limit
- Up to 10 hashtags

#### Twitter/X
- Concise tone
- Trend-focused
- 280 character limit
- Up to 3 hashtags

### Content Optimization

1. **Length Optimization**: Adjusts content length based on platform limits
2. **Tone Matching**: Adapts tone to platform (professional/casual/engaging)
3. **Hashtag Generation**: Creates relevant hashtags based on content and industry
4. **Engagement Scoring**: Calculates potential engagement score (0-100)

### Publishing Flow

1. **Content Generation**: AI creates platform-optimized content
2. **Draft Creation**: Content saved as draft for review
3. **Scheduling**: Optional scheduling for optimal posting times
4. **Publishing**: Direct publishing or copy-to-clipboard
5. **Analytics**: Track engagement and performance

## Export Queue System

### Task Management

- **Priority Levels**: High, Medium, Low
- **Status Tracking**: Pending, Processing, Completed, Failed
- **Progress Monitoring**: Real-time progress updates
- **Error Handling**: Detailed error messages and retry options

### Bulk Operations

- **Multi-Report Export**: Export multiple reports simultaneously
- **Format Selection**: Choose formats for bulk export
- **Progress Tracking**: Overall progress for bulk operations
- **Queue Management**: Pause, resume, or cancel operations

## Data Models

### ReportExport Interface

```typescript
interface ReportExport {
  id: string;
  reportId: string;
  reportTitle?: string;
  section: ExportSection;
  format: ExportFormat;
  status: ExportStatus;
  priority?: ExportPriority;
  timestamp: string;
  filePath?: string;
  shareUrl?: string;
  fileSize?: number;
  filename?: string;
  error?: string;
  errorMessage?: string;
  metadata?: {
    platform?: string;
    audience?: string;
    hashtags?: string[];
    aiGenerated?: boolean;
    originalContent?: string;
  };
}
```

### Report Interface

```typescript
interface Report {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isPinned?: boolean;
  isArchived?: boolean;
  sections: ExportSection[];
  exports: ReportExport[];
  tags?: string[];
  industry?: string;
  budget?: number;
  platforms?: string[];
}
```

## Usage Examples

### Basic Export

```typescript
import { exportSection } from '../engine/export/exportManager';

const handleExport = async () => {
  const result = await exportSection({
    section: 'media-plan',
    format: 'pdf',
    report: campaignReport,
    includeWatermark: true,
    includeTimestamp: true
  });
  
  if (result.success) {
    console.log('Export successful:', result.filename);
  }
};
```

### Social Media Publishing

```typescript
import { generateSocialPost } from '../utils/shareUtils';

const handleSocialPublish = async () => {
  const post = await generateSocialPost(
    campaignReport,
    'strategic-summary',
    {
      platform: 'linkedin',
      autoGenerate: true,
      includeHashtags: true,
      includeSignature: true,
      tone: 'professional'
    }
  );
  
  console.log('Generated post:', post.content);
  console.log('Hashtags:', post.hashtags);
};
```

### Bulk Export

```typescript
import { useExportStore } from '../stores/exportStore';

const { bulkExport } = useExportStore();

const handleBulkExport = async () => {
  await bulkExport({
    reportIds: ['report-1', 'report-2', 'report-3'],
    sections: ['full-report'],
    formats: ['pdf'],
    frequency: 'once'
  });
};
```

## Configuration

### Export Settings

```typescript
const exportConfig = {
  watermark: {
    enabled: true,
    text: 'Generated by PrePilot',
    opacity: 0.3
  },
  timestamp: {
    enabled: true,
    format: 'YYYY-MM-DD'
  },
  fileNaming: {
    pattern: 'prepilot-{section}-{date}',
    includeTimestamp: true
  }
};
```

### Social Media Settings

```typescript
const socialConfig = {
  linkedin: {
    maxLength: 3000,
    hashtagLimit: 5,
    tone: 'professional'
  },
  facebook: {
    maxLength: 63206,
    hashtagLimit: 10,
    tone: 'engaging'
  },
  twitter: {
    maxLength: 280,
    hashtagLimit: 3,
    tone: 'casual'
  }
};
```

## Testing

### Unit Tests

```typescript
// Example test for export functionality
describe('ExportManager', () => {
  it('should export PDF successfully', async () => {
    const result = await exportSection({
      section: 'media-plan',
      format: 'pdf',
      report: mockReport
    });
    
    expect(result.success).toBe(true);
    expect(result.filename).toBeDefined();
  });
});
```

### Integration Tests

```typescript
// Example test for social media publishing
describe('SocialPublishing', () => {
  it('should generate LinkedIn post', async () => {
    const post = await generateSocialPost(
      mockReport,
      'strategic-summary',
      { platform: 'linkedin', autoGenerate: true }
    );
    
    expect(post.content).toBeDefined();
    expect(post.hashtags.length).toBeLessThanOrEqual(5);
  });
});
```

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Export functions loaded on demand
2. **Caching**: Export results cached for quick access
3. **Progress Updates**: Real-time progress for long operations
4. **Error Recovery**: Automatic retry for failed exports
5. **Memory Management**: Cleanup of temporary files and URLs

### File Size Limits

- **PDF**: Up to 50MB
- **PNG**: Up to 10MB
- **Excel**: Up to 100MB
- **JSON**: Up to 5MB

## Security Considerations

### Data Protection

1. **Local Storage**: Sensitive data encrypted
2. **File Access**: Temporary files auto-deleted
3. **API Keys**: Secure storage for social media APIs
4. **Content Validation**: Input sanitization for social posts

### Privacy

1. **No Data Collection**: Export data stays local
2. **Opt-in Sharing**: User controls social media publishing
3. **Transparent Processing**: Clear indication of AI usage

## Troubleshooting

### Common Issues

1. **Export Fails**
   - Check file permissions
   - Verify data integrity
   - Clear browser cache

2. **Social Media Publishing Issues**
   - Verify API credentials
   - Check content length limits
   - Ensure network connectivity

3. **Performance Issues**
   - Reduce file size
   - Check available memory
   - Close other applications

### Debug Mode

Enable debug mode for detailed logging:

```typescript
const debugConfig = {
  enabled: process.env.NODE_ENV === 'development',
  level: 'verbose',
  includeTiming: true
};
```

## Future Enhancements

### Planned Features

1. **Cloud Storage Integration**: Google Drive, Dropbox support
2. **Advanced Scheduling**: Recurring exports
3. **Template System**: Custom export templates
4. **Analytics Dashboard**: Export usage analytics
5. **API Integration**: REST API for external access
6. **Mobile App**: Native mobile export app

### Roadmap

- **Q1 2024**: Cloud storage integration
- **Q2 2024**: Advanced scheduling
- **Q3 2024**: Template system
- **Q4 2024**: Analytics dashboard

## Support

### Documentation
- [Export API Reference](./export-api.md)
- [Social Media Guidelines](./social-guidelines.md)
- [Troubleshooting Guide](./troubleshooting.md)

### Contact
- Email: support@prepilot.ai
- Documentation: docs.prepilot.ai
- GitHub: github.com/prepilot/export-center

---

*Last updated: January 2024*
*Version: 2.0.0*
