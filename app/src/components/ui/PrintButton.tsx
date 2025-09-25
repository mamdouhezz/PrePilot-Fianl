import React from 'react';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiPrinter } from 'react-icons/fi';

interface PrintButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const PrintButton: React.FC<PrintButtonProps> = ({ className = '', children }) => {
  const handlePrint = () => {
    // Add print-specific classes to body
    document.body.classList.add('print-mode');
    
    // Print the page
    window.print();
    
    // Remove print-specific classes after printing
    setTimeout(() => {
      document.body.classList.remove('print-mode');
    }, 1000);
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handlePrint}
      leftIcon={<Icon as={FiPrinter} size={16} />}
      className={`touch-target ${className}`}
    >
      {children || 'طباعة'}
    </Button>
  );
};

export default PrintButton;
