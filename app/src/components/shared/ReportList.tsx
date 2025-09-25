import React from 'react';
import { useExportStore } from '../../stores/exportStore';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiPlus } from 'react-icons/fi';
import ReportCard from './ReportCard';

interface ReportListProps {
    onNavigateToNewPlan: () => void;
}

const ReportList: React.FC<ReportListProps> = ({ onNavigateToNewPlan }) => {
    const reports = useExportStore(state => state.reports);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="heading-responsive text-white">قائمة التقارير</h2>
                <Button 
                    variant="primary" 
                    leftIcon={<Icon as={FiPlus} size={16} />} 
                    onClick={onNavigateToNewPlan}
                    className="touch-target w-full sm:w-auto"
                >
                    <span className="text-sm sm:text-base">إنشاء تقرير جديد</span>
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {reports.filter(r => !r.isArchived).map(report => (
                    <ReportCard key={report.id} report={report} />
                ))}
            </div>
        </div>
    );
};

export default ReportList;