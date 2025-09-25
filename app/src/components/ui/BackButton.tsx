import React from 'react';
import Button from './Button';
import Icon from './Icon';
import { FiArrowRight } from 'react-icons/fi'; // Using FiArrowRight for 'back' in an RTL layout

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, label = 'العودة' }) => {
  return (
    <Button variant="ghost" onClick={onClick} leftIcon={<Icon as={FiArrowRight} />}>
      {label}
    </Button>
  );
};

export default BackButton;
