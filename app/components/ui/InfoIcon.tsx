import React from 'react';
import { FiInfo } from 'react-icons/fi';
import Icon from './Icon';

interface InfoIconProps {
  className?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ className }) => {
  return <Icon as={FiInfo} className={`text-gray-400 ${className}`} />;
};

export default InfoIcon;
