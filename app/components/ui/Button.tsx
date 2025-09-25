/**
 * @file Button.tsx
 * @description Advanced button component with comprehensive loading states and enhanced UX
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React from 'react';
import { FiLoader } from 'react-icons/fi';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * @component Button
 * @description مكون زر متقدم مع حالات تحميل شاملة وتحسينات تجربة المستخدم
 * @param {ButtonProps} props - خصائص المكون
 * @returns {JSX.Element} مكون زر مع الرسوم المتحركة وحالات التحميل
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  disabled = false,
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'button',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-prepilot-purple-600 text-white hover:bg-prepilot-purple-700 focus:ring-prepilot-purple-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-prepilot-purple-600 text-prepilot-purple-600 hover:bg-prepilot-purple-600 hover:text-white focus:ring-prepilot-purple-500',
    ghost: 'text-prepilot-purple-600 hover:bg-prepilot-purple-600/10 focus:ring-prepilot-purple-500',
    glow: 'bg-prepilot-purple-600 text-white hover:bg-prepilot-purple-700 focus:ring-prepilot-purple-500 shadow-lg shadow-prepilot-purple-600/25',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClasses = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`;
  
  const isDisabled = disabled || loading;
  
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <FiLoader className="animate-spin w-4 h-4 mr-2" />
          {loadingText || 'جاري التحميل...'}
        </>
      );
    }

    return (
      <>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );
  };
  
  const buttonContent = (
    <button
      className={classes}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled || loading}
      type={type}
    >
      {renderContent()}
    </button>
  );
  
  if (href && !loading) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }
  
  return buttonContent;
};

export default Button;