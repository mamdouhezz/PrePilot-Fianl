import React from 'react';
import { KPI } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Icon from '../ui/Icon';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatCard: React.FC<KPI> = ({ label, value, change, changeType }) => {
  const isIncrease = changeType === 'increase';
  const changeColor = isIncrease ? 'text-green-400' : 'text-red-400';

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-400">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-white">{value}</div>
        {change && (
          <div className={`flex items-center text-sm font-semibold mt-2 ${changeColor}`}>
            <Icon as={isIncrease ? FiArrowUp : FiArrowDown} className="ms-1" size={16} />
            <span>{change} مقارنة بالفترة السابقة</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;