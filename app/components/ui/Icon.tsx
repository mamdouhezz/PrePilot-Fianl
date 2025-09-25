
import React from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  as: IconType;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
  title?: string;
}

const Icon: React.FC<IconProps> = ({ as: IconComponent, className, size = 20, style, title }) => {
  return <IconComponent className={className} size={size} style={style} title={title} />;
};

export default Icon;