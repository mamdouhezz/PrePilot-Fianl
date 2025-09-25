import React from 'react';
import { BudgetSplitItem } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { PLATFORM_INFO } from '../../constants.ts';
import Icon from '../ui/Icon';

interface BudgetSplitProps {
    budgetSplit?: BudgetSplitItem[];
    totalBudget?: number;
}

const BudgetSplit: React.FC<BudgetSplitProps> = ({ budgetSplit, totalBudget }) => {
    if (!budgetSplit || !totalBudget) return null;
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>توزيع الميزانية</CardTitle>
                <CardDescription>
                    الإجمالي: {totalBudget.toLocaleString('ar-SA')} ريال
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {budgetSplit.map(item => {
                        const platformInfo = PLATFORM_INFO[item.platform];
                        if (!platformInfo) return null;
                        return (
                            <li key={item.platform}>
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-2">
                                        <Icon as={platformInfo.icon} style={{ color: platformInfo.color }} />
                                        <span className="font-bold text-white">{platformInfo.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-300">{item.budget.toLocaleString('ar-SA')} ريال</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div 
                                        className="h-2.5 rounded-full" 
                                        style={{ width: `${item.percentage}%`, backgroundColor: platformInfo.color }}
                                    ></div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </CardContent>
        </Card>
    )
};

export default BudgetSplit;
