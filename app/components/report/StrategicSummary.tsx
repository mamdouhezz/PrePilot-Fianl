import React from 'react';
import { CampaignReport } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';

const StrategicSummary: React.FC<{ report: CampaignReport }> = ({ report }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>الملخص الاستراتيجي</CardTitle>
                <CardDescription>نظرة عامة وتوصيات رئيسية من الذكاء الاصطناعي.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-gray-300 space-y-4 whitespace-pre-wrap">
                    <p>{report.narrative || "يتم إنشاء الملخص الاستراتيجي..."}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default StrategicSummary;
