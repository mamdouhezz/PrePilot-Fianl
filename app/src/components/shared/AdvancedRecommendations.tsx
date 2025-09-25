import React from 'react';
import { CampaignReport } from '../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiShare2 } from 'react-icons/fi';
import { shareRecommendationToLinkedIn } from '../../engine/recommendations/shareUtils';

const AdvancedRecommendations: React.FC<{ report: CampaignReport }> = ({ report }) => {
    
    const handleShare = (recommendation: string) => {
        shareRecommendationToLinkedIn(`Insight from PrePilot AI: ${recommendation}`);
    };
    
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>التوصيات المتقدمة</CardTitle>
                        <CardDescription>نصائح قابلة للتنفيذ لتحسين أداء حملتك.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {report.recommendations.map((rec, index) => (
                        <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex justify-between items-start gap-4">
                            <p className="text-gray-300 flex-grow">{rec}</p>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleShare(rec)} 
                                className="!p-2 h-auto shrink-0" 
                                title="مشاركة"
                            >
                                <Icon as={FiShare2} />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default AdvancedRecommendations;
